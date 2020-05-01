<template>
  <a-modal
      title="操作"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      @ok="handleOk"
  >
    <a-form class="permission-form" :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="id"
        validateStatus="success"
      >
        <a-input
          placeholder="id"
          disabled="disabled"
          v-model="id"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="姓名"
      >
        <a-input
          placeholder="姓名"
          v-model="name"
        />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="性别"
      >
        <a-input
          placeholder="性别"
          v-model="sex"
          disabled="disabled"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="生日"
        hasFeedback
      >
        <a-date-picker style="width: 150px" @change="dateChange" :value="birthday"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="籍贯"
        hasFeedback
      >
        <a-input
          placeholder="籍贯"
          v-model="birthplace"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import moment from "moment";
import { putMember } from '@/network/api'

export default {
  name: 'RoleModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this),
      id: null,
      name: null,
      sex: null,
      birthday: null,
      birthplace: null
    }
  },
  created () {
  },
  methods: {
    edit (record) {
      this.id = record.id
      this.name = record.name
      this.sex = record.sex
      this.birthday = moment(record.birthday)
      this.birthplace = record.birthplace
      this.visible = true
    },
    dateChange(date) {
      this.birthday = date
    },
    handleOk () {
      if (this.name === "" ) {
        this.$message.info("姓名不能为空!")
        return
      }
      if (this.birthday === null ) {
        this.$message.info("生日不能为空!")
        return
      }
      if (this.birthplace === "" ) {
        this.$message.info("籍贯不能为空!")
        return
      }
      this.visible = false
      putMember(this.id, this.name, this.sex, this.birthday, this.birthplace).then(res => {
        console.log(res);
        this.$emit('reload')
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
