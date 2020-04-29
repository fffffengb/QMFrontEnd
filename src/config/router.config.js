import { BasicLayout, Login } from '@/layouts'

export const routerMap = [
  {
    path: '/',
    name: 'root',
    redirect: '/home/profile',
    meta: { title: '首页', requireLogin: false, keepAlive: false, permission: [ 'dashboard' ] }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录', requireLogin: false, keepAlive: false, permission: [ 'dashboard' ] }
  },
  {
    path: '/home',
    name: 'Home',
    component: BasicLayout,
    redirect: '/home/profile',
    meta: { title: '首页', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] },
    children: [
      {
        path: 'authorize',
        name: 'authorize',
        component: () => import('@/views/authorize/Authorize'),
        meta: { title: '认证', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'history_data',
        name: 'history_data',
        component: () => import('@/views/data/HistoryData'),
        meta: { title: '历史数据', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'online_data',
        name: 'online_data',
        component: () => import('@/views/data/OnlineData'),
        meta: { title: '实时数据', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/member/Member'),
        meta: { title: '员工信息', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/Profile'),
        meta: { title: '个人中心', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      }
    ]
  }
];
