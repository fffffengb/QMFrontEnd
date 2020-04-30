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
        path: 'user_manage',
        name: 'user_manage',
        component: () => import('@/views/authorize/UserManage'),
        meta: { title: '用户管理', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'role_manage',
        name: 'role_manage',
        component: () => import('@/views/authorize/RoleManage'),
        meta: { title: '角色管理', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'perm_manage',
        name: 'perm_manage',
        component: () => import('@/views/authorize/PermManage'),
        meta: { title: '权限管理', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
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
