<template>
    <div>
        <div class="inputArea">
            <a-form layout="inline">
                <a-form-item label="id">
                    <a-input style="width: 150px" v-model="id" placeholder=""/>
                </a-form-item>
                <a-form-item label="姓名">
                    <a-input style="width: 150px" v-model="name" placeholder=""/>
                </a-form-item>
                <a-form-item label="性别">
                    <a-select default-value="null" style="width: 150px" @change="sexChange">
                        <a-select-option value="male">
                            男
                        </a-select-option>
                        <a-select-option value="female">
                            女
                        </a-select-option>
                        <a-select-option value="null">
                            所有
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="生日">
                    <a-date-picker style="width: 150px" @change="dateChange" />
                </a-form-item>
                <a-form-item label="籍贯">
                    <a-input style="width: 150px" v-model="birthplace" placeholder=""/>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary"
                              ghost style="width: 150px"
                              icon="trophy"
                              size="default"
                              @click="query">查询</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div>
            <a-table :columns="columns" :dataSource="data" rowKey="id" :pagination="false">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle">id</span>
                <span slot="action" slot-scope="record">
                  <a @click="deleteMember(record)" >删除</a>
                    <a-divider type="vertical" />
                  <a @click="$refs.modal.edit(record)" >编辑</a>
                </span>
            </a-table>
        </div>
        <div class="pagination">
            <a-pagination simple :defaultCurrent="1" :current="curPage" :total="total" @change="pageChange"/>
        </div>
        <role-modal ref="modal" @reload="reload"></role-modal>
    </div>
</template>

<script>
    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            slots: { title: 'customTitle' },
            scopedSlots: { customRender: 'id' },
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday'
        },
        {
            title: '籍贯',
            dataIndex: 'birthplace',
            key: 'birthplace'
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

    ];
    const data = [];
    import { queryMember } from '@/network/api'
    import moment from "moment";
    import RoleModal from './RoleModal'
    export default  {
        name: "Member",
        data () {
            return {
                data,
                columns,
                isLoading: false,
                curPage: 1,
                total: 0,
                id: null,
                name: null,
                sex: null,
                birthday: null,
                birthplace: null
            }
        },
        components: {
            RoleModal
        },
        methods: {
            formatTime(data) {
                for (let i = 0; i < data.length; i++) {
                    data[i].birthday = moment(data[i].birthday).format('L');
                }
                return data
            },
            loadData(page) {
                queryMember(this.id, this.name, this.sex, this.birthday, this.birthplace, page).then(res => {
                    this.data = this.formatTime(res.data.rows)
                    this.total = res.data.total
                    this.curPage = page
                }).catch(err => {
                    console.log(err);
                })
            },
            reload() {
                this.$message.success("修改成功!")
                this.loadData(1)
            },
            pageChange(page) {
                this.loadData(page)
            },
            query() {
                this.loadData(1)
                this.$message.success("查找成功")
            },
            dateChange(date) {
                this.birthday = date
            },
            sexChange(sex) {
                this.sex = sex
                if (sex !== "male" && sex != "female") {
                    this.sex = null
                }
            }
        },
        mounted() {
            // 加载第一页表格数据
            this.loadData(1)
        }
    }
</script>

<style scoped>
    .inputArea {
        padding-top: 5px;
        padding-left: 15px;
        padding-bottom: 15px;
    }

    .pagination {
        position: absolute;
        left:50%;
        bottom: 7%;
    }
</style>
