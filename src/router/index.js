import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () =>import('../views/Home/Home')
      },
      {
        path: '/user',
        name: 'user',
        component: () =>import('../views/UserManage/UserManage')
      },
      {
        path: '/repair',
        name: 'repair',
        component: () =>import('../views/EquipmentMaintenance/Repair')
      },
      {
        path: '/deliver',
        name: 'deliver',
        component: () =>import('../views/EquipmentMaintenance/Deliver')
      },
      {
        path: '/service',
        name: 'service',
        component: () =>import('../views/EquipmentMaintenance/Service')
      },
      {
        path: '/acceptance',
        name: 'acceptance',
        component: () =>import('../views/EquipmentMaintenance/Acceptance')
      },
      {
        path: '/maintenance',
        name: 'maintenance',
        component: () =>import('../views/EquipmentMaintenance/Maintenance')
      },
      {
        path: '/check',
        name: 'check',
        component: () =>import('../views/EquipmentMaintenance/Check')
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () =>import('../views/EquipmentMaintenance/Calendar')
      },
      {
        path: '/database',
        name: 'database',
        component: () =>import('../views/DatabaseManage/DatabaseManage')
      },
      {
        path: '/statisticalanalysis',
        name: 'statisticalanalysis',
        component: () =>import('../views/StatisticalAnalysis/StatisticalAnalysis')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
