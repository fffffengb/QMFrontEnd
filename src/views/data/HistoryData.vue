<template>
  <div>
    <div>
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-col class="c1" :span="5">
            <a-form-item label="输入序号">
              <a-input style="width: 150px" v-model="index" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col class="c2" :span="5">
            <a-form-item label="层级选择">
              <a-select style="width: 150px" v-model="level" placeholder="请选择">
                <a-select-option value="stat">工位</a-select-option>
                <a-select-option value="group">大组</a-select-option>
                <a-select-option value="workshop">车间</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="c1" :span="9">
            <a-form-item label="选择日期">
              <a-range-picker
                      :format="dateFormat"
              />
            </a-form-item>
          </a-col>
          <a-col class="c2" :span="5">
            <a-form-item>
              <a-button type="primary"
                        ghost style="width: 150px"
                        icon="trophy"
                        size="default"
                        @click="query">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-table :columns="columns"
               :dataSource="data"
               :pagination="false"
               :loading="isLoading"
               rowKey="id" >
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
    <div class="pagination">
      <a-pagination simple :defaultCurrent="1" :current="curPage" total="580" @change="pageChange"/>
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
  import { getDailyData } from '@/network/api'

  export default {
    name: "HistoryData",
    data () {
      return {
        data,
        columns,
        isLoading: false,
        level_dic,
        dateFormat: 'YYYY/MM/DD',
        index: 1,
        level: 'stat',
        startTime: '2020-1-1',
        endTime: '2021-1-1',
        curPage: 1,
        total: 58
      }
    },
    methods: {
      formatTime(data) {
        for (let i = 0; i < data.length; i++) {
          data[i].time = moment(data[i].time).format('l');
        }
        return data
      },
      loadData(statId, startTime, endTime, page, size) {
        this.isLoading = true
        getDailyData('daily', this.level, statId, startTime, endTime, page, size).then(res => {
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
      query() {

      }
    },
    mounted() {
      console.log(this.level);
      this.loadData(this.index, this.startTime, this.endTime, 1, 10)
    }
  }
</script>

<style scoped>
  .pagination {
    position: absolute;
    left:50%;
    bottom: 10%;
  }
</style>
