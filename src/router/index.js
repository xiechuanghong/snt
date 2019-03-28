import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Station from '@/views/station/Station.vue'
// import DeviceTypeManagement from '@/views/deviceTypeManagement/DeviceTypeManagement.vue'
// import DeviceManagement from '@/views/deviceManagement/DeviceManagement.vue'
import DeviceTypeManagement from '@/views/device/deviceTypeManagement/DeviceTypeManagement.vue'
import DeviceManagement from '@/views/device/deviceManagement/DeviceManagement.vue'
import UserManagement from '@/views/userManagement/UserManagement.vue'
import SightManagement from '@/views/sight/SightManagement.vue'
import SightTypeManagement from '@/views/sight/SightTypeManagement.vue'
import AlarmEventType from '@/views/alarm/AlarmEventType.vue'
import AlarmGroup from '@/views/alarm/AlarmGroup.vue'
import AlarmLevel from '@/views/alarm/AlarmLevel.vue'
import AlarmMember from '@/views/alarm/AlarmMember.vue'
import AlarmPolicyGroup from '@/views/alarm/AlarmPolicyGroup.vue'
import AlarmPolicyManagement from '@/views/alarm/AlarmPolicyManagement.vue'
import AlarmPolicyModel from '@/views/alarm/AlarmPolicyModel.vue'
import PowerBox from '@/views/powerBox/PowerBox.vue'
import StandingBook from '@/views/standingBook/StandingBook.vue'
import LinkageSet from '@/views/linkage/LinkageSet.vue'
import LinkageLog from '@/views/linkage/LinkageLog.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      // 添加嵌套路由
      children: [
        {
          path: '/station',
          name: 'Station',
          component: Station,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/deviceTypeManagement',
          name: 'DeviceTypeManagement',
          component: DeviceTypeManagement
        },
        {
          path: '/deviceManagement',
          name: 'DeviceManagement',
          component: DeviceManagement
        },
        {
          path: '/userManagement',
          name: 'UserManagement',
          component: UserManagement
        },
        {
          path: '/sightManagement',
          name: 'SightManagement',
          component: SightManagement
        },
        {
          path: '/sightTypeManagement',
          name: 'SightTypeManagement',
          component: SightTypeManagement
        },
        {
          path: '/alarmEventType',
          name: 'AlarmEventType',
          component: AlarmEventType
        },
        {
          path: '/alarmGroup',
          name: 'AlarmGroup',
          component: AlarmGroup
        },
        {
          path: '/alarmLevel',
          name: 'AlarmLevel',
          component: AlarmLevel
        },
        {
          path: '/alarmMember',
          name: 'AlarmMember',
          component: AlarmMember
        },
        {
          path: '/alarmPolicyGroup',
          name: 'AlarmPolicyGroup',
          component: AlarmPolicyGroup
        },
        {
          path: '/alarmPolicyManagement',
          name: 'AlarmPolicyManagement',
          component: AlarmPolicyManagement
        },
        {
          path: '/alarmPolicyModel',
          name: 'AlarmPolicyModel',
          component: AlarmPolicyModel
        },
        {
          path: '/powerBox',
          name: 'PowerBox',
          component: PowerBox
        },
        {
          path: '/standingBook',
          name: 'StandingBook',
          component: StandingBook
        },
        {
          path: '/linkageSet',
          name: 'LinkageSet',
          component: LinkageSet
        },
        {
          path: '/linkageLog',
          name: 'LinkageLog',
          component: LinkageLog
        },
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = JSON.parse(window.localStorage.getItem("token"))
//   let invalid_token = true
//   if(token){
//     if(new Date().getTime() - token.time < 3595000){
//       invalid_token = false
//     }
//   }
//   if (to.matched.some(record => record.meta.requiresAuth) && invalid_token) {
//     next({
//       path: '/',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// })
export default router
