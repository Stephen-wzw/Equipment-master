<template>
  <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" 
  :unique-opened="true" :router="true">
    
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu :index="index + ''" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
  },
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "home",
        },
        {
          path: "/user",
          name: "user",
          label: "用户界面",
          icon: "user",
        },
        {
          label: "设备管理",
          icon: "s-data",
          children: [
            {
              path: "/ledger",
              name: "ledger",
              label: "设备台账",
            },
            {
              path: "/tree",
              name: "tree",
              label: "设备结构树",
            },
            {
              path: "/print",
              name: "print",
              label: "标签打印",
            },
            {
              path: "/record",
              name: "record",
              label: "运行记录",
            },
          ],
        },
        {
          label: "设备维护",
          icon: "setting",
          children: [
            {
              path: "/repair",
              name: "repair",
              label: "设备报修",
            },
            {
              path: "/deliver",
              name: "deliver",
              label: "设备派送",
            },
            {
              path: "/service",
              name: "service",
              label: "设备维修",
            },
            {
              path: "/acceptance",
              name: "acceptance",
              label: "设备验收",
            },
            {
              path: "/maintanance",
              name: "maintenance",
              label: "保养管理",
            },
            {
              path: "/check",
              name: "check",
              label: "点检管理",
            },
            {
              path: "/calendar",
              name: "calendar",
              label: "维保日历",
            },
          ],
        },
        {
          path: "/database",
          name: "database",
          label: "资料库管理",
          icon: "office-building",
        },
        {
          path: "/statisticalanalysis",
          name: "statisticalanalysis",
          label: "统计分析",
          icon: "document",
        },
      ],
    };
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style>
.el-menu {
  height: 100%;
  width: 100%;
  border: none;
}
</style>
