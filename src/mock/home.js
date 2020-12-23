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
      date: Mock.Random.date(),
      repairnumber: Mock.Random.integer(20150101, 20201231),
      equipmentID: Mock.Random.integer(100000000, 999999999),
      equipmentname: Mock.mock('@pick(["空调", "水管", "新风机", "水泵", "发电机"])'),
      repairer: Mock.Random.cname(),
      deliverysituation: Mock.mock('@pick(["未派送", "派送中", "已派送"])'),
      repairman: Mock.Random.cname(),
      repairsituation: Mock.mock('@pick(["维修未完成", "维修已完成"])'),
      acceptancesituation: Mock.mock('@pick(["验收未通过", "验收通过"])'),
    })
  )
}

export default {
    getHomeData: () => {
        return {
            code: 20000,
            data: {
                videoData: [
                    Mock.Random.extend({
                        constellation: function(date) {
                            var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
                            return this.pick(constellations)
                        }
                    }),
                    {
                        name: 'Springboot',
                        value: Mock.Random.constellation()
                    },
                    {
                        name: 'C',
                        value: Mock.Random.constellation()
                    },
                    {
                        name: 'C++',
                        value: Mock.Random.constellation()
                    },
                    {
                        name: 'Java',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: 'JavaScript',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                ]
            }
        }
    },
    /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
    getDataList: config => {
        const { name, page = 1, limit = 10 } = param2Obj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(user => {
          if (name && user.equipmentname.indexOf(name) === -1 
          && user.deliverysituation.indexOf(name) === -1
          && user.repairer.indexOf(name) === -1) return false
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
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
    createEquipment: config => {
        const { date, repairnumber, equipmentID, equipmentname, repairer, deliverysituation, repairman, repairsituation, acceptancesituation } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
          id: Mock.Random.guid(),
          date: date,
          repairnumber: repairnumber,
          equipmentID: equipmentID,
          equipmentname: equipmentname,
          repairer: repairer,
          deliverysituation: deliverysituation,
          repairman: repairman,
          repairsituation: repairsituation,
          acceptancesituation: acceptancesituation
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
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateEquipment: config => {
    const { id, date, repairnumber, equipmentID, equipmentname, repairer, deliverysituation, repairman, repairsituation, acceptancesituation } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.date = date
        u.repairnumber = repairnumber
        u.equipmentID = equipmentID
        u.equipmentname = equipmentname
        u.repairer = repairer
        u.deliverysituation = deliverysituation
        u.repairman = repairman
        u.repairsituation = repairsituation
        u.acceptancesituation = acceptancesituation
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
  deleteEquipment: config => {
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