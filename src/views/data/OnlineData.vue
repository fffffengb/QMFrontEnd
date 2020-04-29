<template>
    <div class="root">
        <a-row class="main" :gutter="[96, 16]">
            <a-col class="data" :span="18">
                <a-table :columns="columns" :dataSource="data" :pagination="false" rowKey="id" >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                </a-table>
            </a-col>
            <a-col class="operator" :span="6">
                <a-form layout="inline">
                    <a-form-item label="开始时间">
                        <a-date-picker
                            :showTime="{ format: 'HH:mm' }"
                            format="YYYY-MM-DD HH:mm"
                            placeholder='点击输入开始时间'
                            @ok="dateStartOk"
                            size="default"
                        />
                    </a-form-item>
                    <a-form-item label="结束时间">
                        <a-date-picker
                            :showTime="{ format: 'HH:mm' }"
                            format="YYYY-MM-DD HH:mm"
                            placeholder='点击输入结束时间'
                            @ok="dateEndOk"
                            size="default"
                        />
                    </a-form-item>
                    <a-form-item label="层级序号">
                        <a-input style="width: 195px"/>
                    </a-form-item>
                    <a-form-item label="层级选择">
                        <a-select defaultValue="工位" style="width: 195px" @change="handleChange">
                            <a-select-option value="工位">工位</a-select-option>
                            <a-select-option value="大组">大组</a-select-option>
                            <a-select-option value="车间">车间</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
                <div class="button">
                    <a-button type="primary"
                              ghost block
                              icon="trophy"
                              size="large"
                              @click="query">查询</a-button>
                </div>
            </a-col>
        </a-row>
        <div class="pagination">
            <a-pagination simple :defaultCurrent="1" :current="curPage" :total="total" @change="pageChange"/>
        </div>
    </div>
</template>

<script>
  const columns = [
    {
      title: '工位',
      dataIndex: 'statId',
      key: 'statId'
    },
    {
      title: '实时质量',
      dataIndex: 'quality',
      key: 'quality',
    },
    {
      title: '工时',
      dataIndex: 'workHour',
      key: 'workHour',
    },
    {
      title: '时间',
      key: 'time',
      dataIndex: 'time'
    }
  ];
  const data = [];

  import moment from "moment";
  import { getOnlineData } from '@/network/api'

  export default {
    data() {
      return {
        data,
        columns,
        statId: null,
        startTime: null,
        endTime: null,
        curPage: 1,
        total: 0
      };
    },
    methods: {
      formatTime(data) {
        for (let i = 0; i < data.length; i++) {
          data[i].time = moment(data[i].time).format('lll');
        }
        return data
      },
      loadData(statId, startTime, endTime, page, size) {
        getOnlineData('online', 'stat', statId, startTime, endTime, page, size).then(res => {
          this.data = this.formatTime(res.data.rows)
          this.total = res.data.total
        }).catch(err =>{
          console.log(err);
        })
      },
      dateStartOk(date) {
        this.startTime = date.format('YYYY-MM-DD_h:mm:ss')
      },
      dateEndOk(date) {
        this.endTime = date.format('YYYY-MM-DD_h:mm:ss')
      },
      inputBoxChange(value) {
        this.statId = value
        console.log(value);
      },
      query() {
        this.loadData(this.statId, this.startTime, this.endTime, 1, 10)
        this.curPage = 1
      },
      pageChange(page, size) {
        this.loadData(this.statId, this.startTime, this.endTime, page, size)
        this.curPage = page
      }
    },
    created() {
        this.loadData(this.statId, this.startTime, this.endTime, 1, 10)
    }
  };
</script>

<style scoped>
    .data {
        height: 100%;
    }

    .operator {
        height: 100%;
    }

    .label {
        padding-top: 15px;
        padding-right: 5px;
    }

    .inputBox {
        padding-top: 15px;
        padding-right: 5px;
        /*float: left;*/
    }

    .button {
        padding-top: 15px;
        padding-right: 5px;;
        /*float: left;*/
    }

    .main {
        height: 80%;
    }

    .pagination {
        position: absolute;
        left:50%;
        bottom: 3%;
    }

    .root {
        height: 100%;
    }
</style>
