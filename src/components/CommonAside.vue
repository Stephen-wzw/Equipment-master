<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
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
            return this.asideMenu.filter(item => !item.children)
        },
        hasChildren() {
            return this.asideMenu.filter(item => item.children)
        },
    },
    data() {
        return {
            asideMenu: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 'home'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户界面',
                    icon: 'user'
                },
                {
                    label: '设备管理',
                    icon: 'setting',
                    children: [
                        {
                            path: '/page8',
                            name: 'ledger',
                            label: '设备台账',
                        },
                        {
                            path: '/page9',
                            name: 'tree',
                            label: '设备结构树',
                        },
                        {
                            path: '/page10',
                            name: 'print',
                            label: '标签打印',
                        },
                        {
                            path: '/page11',
                            name: 'record',
                            label: '运行记录',
                        },
                    ]
                }, 
                {
                    label: '设备维护',
                    icon: 'setting',
                    children: [
                        {
                            path: '/page1',
                            name: 'repair',
                            label: '设备报修',
                        },
                        {
                            path: '/page2',
                            name: 'deliver',
                            label: '设备派送',
                        },
                        {
                            path: '/page3',
                            name: 'service',
                            label: '设备维修',
                        },
                        {
                            path: '/page4',
                            name: 'acceptance',
                            label: '设备验收',
                        },
                        {
                            path: '/page5',
                            name: 'maintenance',
                            label: '保养管理',
                        },
                         {
                            path: '/page6',
                            name: 'check',
                            label: '点检管理',
                        },
                         {
                            path: '/page7',
                            name: 'calendar',
                            label: '维保日历',
                        },
                    ]
                },
                {
                    path: '/database',
                    name: 'database',
                    label: '资料库管理',
                    icon: 'office-building'
                },
                {
                    path: '/statisticalanalysis',
                    name: 'statisticalanalysis',
                    label: '统计分析',
                    icon: 'document'
                },
            ]
        }
    },
    methods: {
        clickMenu(item) {
            this.$router.push({name: item.name})
            this.$store.commit('selectMenu', item)
        }
    }
};
</script>

<style>
.el-menu {
    height: 100%;
    width: 100%;
    border: none;
}
</style>
