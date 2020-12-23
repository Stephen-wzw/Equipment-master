<template>
    <div>
    <el-row :gutter="20">
    <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="4"><div class="search"><el-input placeholder="请输入内容" v-model="input" clearable></el-input></div></el-col>
    <el-col :span="2"><div class="search"><el-button type="primary" icon="el-icon-search">搜索</el-button></div></el-col>
  </el-row>
  
  <el-table :data="tableData" border >
      <el-table-column type="index" width="42" align="center"></el-table-column>
      <el-table-column v-for="(val, key1) in tableLabel" :key="key1" :prop="key1" :label="val" width="178">
      </el-table-column>
  </el-table>
    </div>
</template>

<script>
    export default {
         data() {
      return {
        input: '',
        searchForm: {
          keyword: ''
        },
        formLabel: [
          {
            model: 'keyword',
            label: ''
          }
        ],
        tableData: [
        {
          date: "2016-05-02",
          repairnumber: <el-button type="text">BX20201111</el-button>,
          equipmentID: "20201206",
          equipmentname: '液压机',
          repairer: '张三',
          deliverysituation: '正在派送',
          repairman: '李四',
          repairsituation: '维修未完成',
          acceptancesituation: ''
        },
        {
          date: "2020-05-02",
          repairnumber: <el-button type="text">BX20200501</el-button>,
          equipmentID: "20201206",
          equipmentname: '新风机',
          repairer: '小王',
          deliverysituation: '已派送',
          repairman: '李四',
          repairsituation: '维修未完成',
          acceptancesituation: ''
        },
        {
          date: "2020-07-02",
          repairnumber: <el-button type="text">BX20200611</el-button>,
          equipmentID: "20201025",
          equipmentname: '水管',
          repairer: '王五',
          deliverysituation: '已派送',
          repairman: '李四',
          repairsituation: '维修完成',
          acceptancesituation: ''
        },
        {
          date: "2020-08-22",
          repairnumber: <el-button type="text">BX20201221</el-button>,
          equipmentID: "20201226",
          equipmentname: '空调',
          repairer: '赵六',
          deliverysituation: '未派送',
          repairman: '李四',
          repairsituation: '维修未完成',
          acceptancesituation: ''
        },
      ],
      tableLabel: {
          date: '报修时间',
          repairnumber: '报修单号',
          equipmentID: '设备编号',
          equipmentname: '设备名称',
          repairer: '报修人',
          deliverysituation: '派送情况',
          repairman: '维修人',
          repairsituation: '维修情况',
          acceptancesituation: '验收情况'
      }
      }
    }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: white;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>