import UserView from '@/views/blog/UserView'

export default {
  path: 'user',
  name: '用户页',
  meta: {
    tite: '我的主页',
    checkAuth: true
  },
  component: UserView
}