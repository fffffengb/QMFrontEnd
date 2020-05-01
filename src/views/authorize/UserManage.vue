<template>
    <div>
        <div class="inputArea">
            <a-form layout="inline">
                <a-row :gutter="12">
                    <a-col class="c2" :span="5">
                        <a-form-item label="输入用户名">
                            <a-input style="width: 150px" v-model="username" placeholder=""/>
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
            <a-table :columns="columns" :dataSource="data" rowKey="id">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> 唯一标识符</span>
                <span slot="roleNames" slot-scope="roleNames">
                  <a-tag
                      v-for="tag in roleNames"
                      :key="tag"
                  >
                    {{ tag }}
                  </a-tag>
                </span>
                <span slot="action" slot-scope="record">
                  <a @click="deleteUser(record)" >删除</a>
                    <a-divider type="vertical" />
                  <a @click="showAssignDialog(record)" >分配角色</a>
                </span>
            </a-table>
        </div>
        <a-modal
            title="分配角色"
            style="top: 20px;"
            :width="800"
            ref="modal"
            v-model="assignDialogVisible"
            @ok="assignRoles"
        >
            <a-checkbox-group :options="allRoles" @change="checkboxChange" />
        </a-modal>
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
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '角色',
            key: 'roleNames',
            dataIndex: 'roleNames',
            scopedSlots: { customRender: 'roleNames' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },
    ];
    const data = [];
    import { getUserData, deleteByUsername, postAssignRoles, getRoles } from '@/network/api'
    export default  {
        name: "Authorize",
        data () {
            return {
                data,
                columns,
                isLoading: false,
                assignDialogVisible: false,
                username: null,
                allRoles: [],
                selectedRoles: [],
                selectedRecord: null
            }
        },
        methods: {
            loadData(username) {
                getUserData(username, 1, 10).then(res => {
                    this.data = res.data.rows
                    this.$message.success("查找成功" + res.data.total + "条")
                })
            },
            deleteUser(record) {
                deleteByUsername(record.username).then(() => {
                    this.$message.success("删除成功")
                    for (let i = 0; i < this.data.length; i++) {
                        if (this.data[i].username === record.username) {
                            this.data.splice(i, 1)
                            console.log(this.data);
                            break
                        }
                    }
                })
                // this.visible = true
            },
            updateRecord(id, roleNames) {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].id === id)
                        this.data[i].roleNames = roleNames
                }
            },
            assignRoles() {
                postAssignRoles(this.selectedRecord.id, this.selectedRoles).then((res) => {
                    this.updateRecord(this.selectedRecord.id, res.data)
                    this.assignDialogVisible = false
                    this.$message.success("分配成功")
                })
            },
            showAssignDialog(record) {
                this.assignDialogVisible = true
                this.selectedRecord = record
            },
            checkboxChange(values) {
                this.selectedRoles = values
            },
            query() {
                this.loadData(this.username)
            }
        },
        mounted() {
            // 加载表格数据
            this.loadData(this.username)
            // 加载角色数据
            getRoles().then(res => {
                let data = res.data
                for (let i = 0; i < data.length; i++) {
                    this.allRoles.push({"label": data[i].c_name, "value": data[i].id})
                }
            })
        }
    }
</script>

<style scoped>
    .inputArea {
        padding-top: 5px;
        padding-left: 15px;
        padding-bottom: 15px;
    }
</style>
