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
                  <a @click="displayDialog(record)" >分配角色</a>
                </span>
            </a-table>
        </div>
        <a-modal
            title="操作"
            style="top: 20px;"
            :width="800"
            v-model="visible"
            @ok="handleDialogOk"
        >
            <span>Hi~ o(*￣▽￣*)ブ</span>
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
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },
    ];
    const data = [];
    import { getUserData, deleteByUsername } from '@/network/api'
    export default  {
        name: "Authorize",
        data () {
            return {
                data,
                columns,
                isLoading: false,
                visible: false,
                username: null
            }
        },
        methods: {
            loadData(username) {
                getUserData(username, 1, 10).then(res => {
                    this.data = res.data.rows
                    this.$message.success("查找成功" + res.data.total + "条")
                    console.log(res);
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
            handleDialogOk(value) {
                console.log(value);
            },
            query() {
                this.loadData(this.username)
            }
        },
        mounted() {
            this.loadData(this.username)
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
