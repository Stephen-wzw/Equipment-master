<template>
    <div>
    <el-dialog :title="operateType === 'add' ? '新增人员' : '更新人员信息'" :visible.sync="isShow">
      <user-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></user-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="operateType === 'add' ? '新增人员' : '查看人员信息'" :visible.sync="isWatch">
      <user-formwatch :formLabel="operateFormLabel" :form="operateForm" ref="form"></user-formwatch>
    </el-dialog>
    <div class="user-header">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <user-form :inLine="true" :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </user-form>
    </div>
    <div class="user-content">
      <user-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser" @watch="watchUser"></user-table>
    </div>
  </div>
</template>

<script>
import UserForm from '../../components/UserForm'
import UserTable from '../../components/UserTable'
import UserFormwatch from '../../components/UserFormwatch'
export default {
    components: {
        UserForm,
        UserTable,
        UserFormwatch
    },
    data() {
        return {
            operateType: 'add',
            isShow: false,
            isWatch: false,
            tableData: [],
            tableLabel: [
            {
                prop: 'jobnumber',
                label: '工号',
            },
            {
                prop: 'name',
                label: '姓名',
            },
            {
                prop: 'sex',
                label: '性别',
            },
            {
                prop: 'phonenumber',
                label: '电话号码',
            },
            {
                prop: 'post',
                label: '岗位',
            },
        ],
        config: {
            page: 1,
            total: 30,
            loading: false
        },
        operateForm: {
            jobnumber: '',
            name: '',
            sex: '',
            phonenumber: '',
            post: '',
        },
        operateFormLabel: [
            {
                model: 'jobnumber',
                label: '工号',
            },{
                model: 'name',
                label: '姓名'
            },{
                model: 'sex',
                label: '性别',
                type: 'select',
                opts: [
                {
                    label: '男',
                    value: '男'
                },
                {
                    label: '女',
                    value: '女'
                },
                ]
            },{
                model: 'phonenumber',
                label: '电话号码',
            },{
                model: 'post',
                label: '岗位',
                type: 'select',
                opts: [
                {
                    label: '人事部',
                    value: '人事部'
                },
                {
                    label: '监管部',
                    value: '监管部'
                },
                {
                    label: '维修部',
                    value: '维修部'
                },
                {
                    label: '研发部',
                    value: '研发部'
                },
                ]
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
        this.$http.get('/api/user/getData', {
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
      addUser() {
        this.operateForm = {}
        this.operateType = 'add'
        this.isShow = true
      },
      editUser(row) {
        this.operateType = 'edit'
        this.isShow = true
        this.operateForm = row
        console.log(row)
      },
      watchUser(row) {
        this.operateType = 'watch'
        this.isWatch = true
        this.operateForm = row
        console.log(row)
      },
      confirm() {
        if (this.operateType === 'edit') {
          this.$http.post('/api/user/edit', this.operateForm).then(res => {
            console.log(res.data)
            this.isShow = false
            this.getList()
          })
        } else {
          this.$http.post('/api/user/add', this.operateForm).then(res => {
            console.log(res.data)
            this.isShow = false
            this.getList()
          })
        }
      },
      delUser(row) {
         this.$confirm('是否继续删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = row.id
          this.$http.get('/api/user/del', {
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
}
</script>

<style>
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>