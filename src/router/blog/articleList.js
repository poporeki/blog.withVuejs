import AritcleListView from '@/views/blog/artlist/ArticleListView'
import CommonView from '@/views/blog/artlist/CommonView'
export default {
  path: 'articlelist',
  component: AritcleListView,
  children: [{
    path: '',
    component: CommonView,
    meta: {
      title: '文章列表'
    }
  }]

}