<template>
  <div id="sider">
    <a-layout-sider :trigger="null" theme="light" :style="{ height: '100%' }">
      <!-- Logo -->
      <div id="logo">
        <Logo title="QM系统测试版"/>
      </div>

      <!-- 菜单栏 :style="{ background: '#00'} -->
      <div id="menu">
          <a-menu theme="light" mode="inline" :selectedKeys="[selectedKey]" @click="clickMenu">
            <a-sub-menu key="0">
              <span slot="title"><a-icon type="user" />质量信息</span>
              <a-menu-item key="online_data">实时质量监控</a-menu-item>
              <a-menu-item key="history_data">历史质量回顾</a-menu-item>
            </a-sub-menu>

            <a-menu-item key="member">
              <a-icon type="book" />
              <span>员工信息</span>
            </a-menu-item>

            <a-menu-item key="authorize">
              <a-icon type="read" />
              <span>权限管理</span>
            </a-menu-item>

            <a-menu-item key="profile">
              <a-icon type="user" />
              <span>个人中心</span>
            </a-menu-item>

          </a-menu>
      </div>
    </a-layout-sider>
  </div>
</template>

<script>
import { Logo } from '@/components'
export default {
  name: 'GlobalSider',
  components: {
    Logo
  },
  data() {
    return {
      selectedKey: "profile"
    };
  },
  methods: {
    clickMenu({key}) {
      let path = "";
      this.selectedKey = key;
      if (key === "online_data") {
        path = "online_data"
      } else if (key === "history_data") {
        path = "history_data"
      } else if (key === "member") {
        path = "member"
      } else if (key === "authorize") {
        path = "authorize"
      } else if (key === "profile") {
        path = "profile"
      }
      this.$emit("clickItem", path)
      }
  },
  mounted() {
    this.selectedKey = this.$route.name
  }
}
</script>

<style>
  #sider {
    height: 100%;
  }

  #menu {
    padding-top: 15px;
  }
</style>
