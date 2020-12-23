import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(
      Mock.mock({
        id: Mock.Random.guid(),
        jobnumber: Mock.Random.integer(100000000, 999999999),
        name: Mock.Random.cname(),
        sex: Mock.mock('@pick(["男", "女"])'),
        phonenumber:Mock.Random.integer(10000000000, 19999999999),
        post: Mock.mock('@pick(["人事部", "监管部", "维修部", "研发部"])'),
      })
    )
  }

  export default {
    /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
    getUserList: config => {
        const { name, page = 1, limit = 10 } = param2Obj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(user => {
          if (name && user.name.indexOf(name) === -1 
          && user.sex.indexOf(name) === -1
          && user.post.indexOf(name) === -1) return false
          return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
          code: 20000,
          count: mockList.length,
          list: pageList
        }
      },
    /**
   * 增加用户
   * @param name, jobnumber, post, phonenumber, sex
   * @return {{code: number, data: {message: string}}}
   */
    createUser: config => {
        const { jobnumber, name, sex, phonenumber, post } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
          id: Mock.Random.guid(),
          jobnumber: jobnumber,
          equipmentID: equipmentID,
          name: name,
          sex: sex,
          phonenumber: phonenumber,
          post: post,
        })
        return {
          code: 20000,
          data: {
            message: '添加成功'
          }
        }
      },
    /**
   * 修改用户
   * @param id, name, jobnumber, post, phonenumber, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { jobnumber, name, sex, phonenumber, post } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.jobnumber = jobnumber
        u.name = name
        u.sex = sex
        u.phonenumber = phonenumber
        u.post = post
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
}