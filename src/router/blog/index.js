import Article from './article';
import ArticleList from './articleList';
import UpdateLog from './updatelog';
import BlogLayout from '@/views/blog'
import BlogHome from '@/views/blog/HomeView.vue'
import User from './user'
import Tools from '@/router/tools'

const Defaults = {
  path: '',
  meta: {
    title: "博客首页",
    notshow: {
      loading: true
    }
  },
  component: BlogHome
}
export default {
  path: '/blog',
  name: 'blog',
  component: BlogLayout,
  children: [Defaults, Article, ArticleList, UpdateLog, Tools, User]
}