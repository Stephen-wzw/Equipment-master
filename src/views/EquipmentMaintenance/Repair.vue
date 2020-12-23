<template>
  <div>
    <el-dialog :title="operateType === 'add' ? '新增报修' : '更新报修'" :visible.sync="isShow">
      <equipment-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></equipment-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="operateType === 'add' ? '新增报修' : '查看信息'" :visible.sync="isWatch">
      <equipment-formwatch :formLabel="operateFormLabel" :form="operateForm" ref="form"></equipment-formwatch>
    </el-dialog>
    <div class="equipment-header">
      <el-button type="primary" @click="addEquipment">添加报修</el-button>
      <equipment-form :inLine="true" :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </equipment-form>
    </div>
    <div class="equipment-content">
      <equipment-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editEquipment" @del="delEquipment" @watch="watchEquipment"></equipment-table>
    </div>
  </div>
</template>

<script>
import EquipmentForm from '../../components/EquipmentForm'
import EquipmentTable from '../../components/EquipmentTable'
import EquipmentFormwatch from '../../components/EquipmentFormwatch'
export default {
  components: {
    EquipmentForm,
    EquipmentTable,
    EquipmentFormwatch
  },
  data() {
      return {
        operateType: 'add',
        isShow: false,
        isWatch: false,
        tableData: [],
        tableLabel: [
          {
            prop: 'date',
            label: '报修时间',
          },
          {
            prop: 'repairnumber',
            label: '报修单号',
          },
          {
            prop: 'equipmentID',
            label: '设备编号',
          },
          {
            prop: 'equipmentname',
            label: '设备名称',
          },
          {
            prop: 'repairer',
            label: '报修人',
          },
          {
            prop: 'deliverysituation',
            label: '派送情况',
          },
          {
            prop: 'repairman',
            label: '维修人',
          },
          {
            prop: 'repairsituation',
            label: '维修情况',
          },
          {
            prop: 'acceptancesituation',
            label: '验收情况',
          },
        ],
        config: {
          page: 1,
          total: 30,
          loading: false
        },
        operateForm: {
          date: '',
          repairnumber: '',
          equipmentID: '',
          equipmentname: '',
          other: '',
          repairer: '',
          equipmentstatus: '',
          faulttype: '',
          faultphenomenon: '',
          acceptancesituation: ''
        },
        operateFormLabel: [
          {
            model: 'date',
            label: '报修时间',
            type: 'date'
          },{
            model: 'repairnumber',
            label: '报修单号'
          },{
            model: 'equipmentID',
            label: '设备编号'
          },{
            model: 'equipmentname',
            label: '设备名称'
          },{
            model: 'other',
            label: '其他说明'
          },{
            model: 'repairer',
            label: '报修人'
          },{
            model: 'equipmentstatus',
            label: '设备状态',
            type: 'select',
            opts: [
              {
                label: '使用中',
                value: '使用中'
              },
              {
                label: '已停用',
                value: '已停用'
              },
            ]
          },{
            model: 'faulttype',
            label: '故障类型',
            type: 'select',
            opts: [
              {
                label: '管道故障',
                value: '管道故障'
              },
              {
                label: '气动故障',
                value: '气动故障'
              },
              {
                label: '电气故障',
                value: '电气故障'
              },
              {
                label: '机械故障',
                value: '机械故障'
              },
              {
                label: '其他',
                value: '其他'
              },
            ]
          },{
            model: 'faultphenomenon',
            label: '故障现象',
            type: 'textarea'
          }
        ],
        searchForm: {
          keyword: ''
        },
        formLabel: [
          {
            model: 'keyword',
            label: ''
          }
        ],
      }
    },
    methods: {
      getList(name = '') {
        this.config.loading = true
        // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
        name ? (this.config.page = 1) : ''
        this.$http.get('/api/home/getData', {
          params: {
            page: this.config.page,
            name
          }
        }).then(res => {
          this.tableData = res.data.list
          this.config.total = res.data.count
          this.config.loading = false
          console.log(res.data)
        })
      },
      addEquipment() {
        this.operateForm = {}
        this.operateType = 'add'
        this.isShow = true
      },
      editEquipment(row) {
        this.operateType = 'edit'
        this.isShow = true
        this.operateForm = row
        console.log(row)
      },
      watchEquipment(row) {
        this.operateType = 'watch'
        this.isWatch = true
        this.operateForm = row
        console.log(row)
      },
      confirm() {
        if (this.operateType === 'edit') {
          this.$http.post('/api/home/edit', this.operateForm).then(res => {
            console.log(res.data)
            this.isShow = false
            this.getList()
          })
        } else {
          this.$http.post('/api/home/add', this.operateForm).then(res => {
            console.log(res.data)
            this.isShow = false
            this.getList()
          })
        }
      },
      delEquipment(row) {
         this.$confirm('是否继续删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = row.id
          this.$http.get('/api/home/del', {
            params: {
              id
            }
          }).then(res => {
            console.log(res.data)
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    mounted () {
      this.getList();
    },
};
</script>

<style>
.equipment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
