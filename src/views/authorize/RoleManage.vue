<template>
  <div class="card-list">
    <a-row :gutter="[16, 16]">
      <a-col class="inputArea" :span="6">
        <a-form layout="horizontal">
          <a-form-item label="角色名">
            <a-input
                    v-model="roleName"
                    size="large"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="角色描述">
            <a-input
                    v-model="roleCName"
                    size="large"
            >
            </a-input>
          </a-form-item>
        </a-form>
        <a-button type="primary"
                  ghost block
                  icon="plus"
                  size="large"
                  @click="addRole">添加角色</a-button>
      </a-col>
      <a-col class="displayArea" :span="18">
        <div  ref="content">
          <a-list
                  rowKey="id"
                  :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
                  :dataSource="dataSource"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card :hoverable="true">
                <a-card-meta>
                  <a slot="title">{{ item.name }}</a>
                  <div class="meta-content" slot="description">{{ item.c_name }}</div>
                </a-card-meta>
                <template class="ant-card-actions" slot="actions">
                  <a @click="clickDelete(item.id)">删除该角色</a>
                </template>
              </a-card>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  const dataSource = []
  import { getRoles, deleteRole, postRole } from '@/network/api'
  export default {
    name: "RoleManage",
    data() {
      return {
        dataSource,
        roleName: null,
        roleCName: null
      }
    },
    methods: {
      addRole() {
        postRole(this.roleName, this.roleCName).then( res=> {
          console.log(res);
          this.$message.success("添加成功！")
          this.dataSource.push({"c_name": this.roleCName, "name": this.roleName})
          console.log(this.dataSource);
        }).catch(err => {
          console.log(err);
        })
      },
      clickDelete(roleId) {
        deleteRole(roleId).then(res => {
          this.$message.success("删除成功")
          for (let i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].id === roleId) {
              this.dataSource.splice(i, 1)
              break
            }
          }
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      getRoles().then(res => {
        this.dataSource = res.data
      })
    }
  }
</script>

<style lang="less" scoped>
  .card-list {
    padding: 20px;
  }
  /*.new-btn {*/
  /*  background-color: #fff;*/
  /*  border-radius: 2px;*/
  /*  width: 100%;*/
  /*  height: 140px;*/
  /*}*/

</style>
