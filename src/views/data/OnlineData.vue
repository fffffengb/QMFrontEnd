<template>
    <div class="root">
        <a-row class="main" :gutter="[16, 16]">
            <a-col class="data" :span="18">
                <a-table :columns="columns"
                         :dataSource="data"
                         :pagination="false"
                         :loading="isLoading"
                         rowKey="id" >
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
                            @change="dateStartChange"
                            size="default"
                        />
                    </a-form-item>
                    <a-form-item label="结束时间">
                        <a-date-picker
                            :showTime="{ format: 'HH:mm' }"
                            format="YYYY-MM-DD HH:mm"
                            placeholder='点击输入结束时间'
                            @ok="dateEndOk"
                            @change="dateEndChange"
                            size="default"
                        />
                    </a-form-item>
                    <a-form-item label="输入序号">
                        <a-input
                            style="width: 195px"
                            v-model="index"
                        >
                            <a-tooltip v-if="error" slot="suffix" title="Extra information">
                                <a-icon type="close" style="color: red" />
                            </a-tooltip>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="层级选择">
                        <a-select defaultValue="stat" style="width: 195px" @change="selectChange">
                            <a-select-option value="stat">工位</a-select-option>
                            <a-select-option value="group">大组</a-select-option>
                            <a-select-option value="workshop">车间</a-select-option>
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
  const level_dic = {
    'stat': '工位',
    'group': '大组',
    'workshop': '车间'
  };

  import moment from "moment";
  import { getOnlineData } from '@/network/api'

  export default {
    data() {
      return {
        data,
        columns,
        isLoading: false,
        level_dic,
        error: false,
        index: null,
        startTime: null,
        endTime: null,
        level:'stat',
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
        this.isLoading = true
        getOnlineData('online', this.level, statId, startTime, endTime, page, size).then(res => {
          this.data = this.formatTime(res.data.rows)
          this.total = res.data.total
          this.$message.success("查询成功")
        }).catch(err =>{
          console.log(err);
          if (err.code === 20003)
            this.$message.error(err.data)
        }).finally(() => {
          this.isLoading = false
        })
      },
      dateStartOk(date) {
        this.startTime = date.format('YYYY-MM-DD_h:mm:ss')
      },
      dateStartChange(date) {
        if (date != null)
            this.startTime = date.format('YYYY-MM-DD_h:mm:ss')
        else
          this.startTime = null
      },
      dateEndOk(date) {
        this.endTime = date.format('YYYY-MM-DD_h:mm:ss')
      },
      dateEndChange(date) {
        if (date != null)
          this.endTime = date.format('YYYY-MM-DD_h:mm:ss')
        else
          this.endTime = null
      },
      selectChange(value) {
        this.level = value
      },
      query() {
        const re = /^[0-9]*$/
        if (this.index != null && !re.test(this.index)) {
          this.$message.error("序号只能是数字！")
          this.error = true
          return
        }
        this.error = false
        this.columns[0].title = this.level_dic[this.level]
        this.columns[0].dataIndex = this.level + "Id"
        this.loadData(this.index, this.startTime, this.endTime, 1, 10)
        this.curPage = 1
      },
      pageChange(page, size) {
        this.loadData(this.index, this.startTime, this.endTime, page, size)
        this.curPage = page
      }
    },
    mounted() {
      console.log(this.level);
      this.loadData(this.index, this.startTime, this.endTime, 1, 10)
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
