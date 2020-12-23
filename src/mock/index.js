import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'

//设置200-2000ms延时请求到数据
Mock.setup({
    timeout: '200-1000'
})

//首页相关
//拦截的是/home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getHomeData)

//用户相关
Mock.mock(/\/home\/getData/, 'get', homeApi.getDataList)
Mock.mock(/\/home\/add/, 'post', homeApi.createEquipment)
Mock.mock(/\/home\/edit/, 'post', homeApi.updateEquipment)
Mock.mock(/\/home\/del/, 'get', homeApi.deleteEquipment)
Mock.mock(/\/user\/getData/, 'get', userApi.getUserList)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)