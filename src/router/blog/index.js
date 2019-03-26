import Article from './article';
import ArticleList from './articleList';
import UpdateLog from './updatelog';
import BlogLayout from '@/views/blog/LayoutIndexView.vue'
import BlogHome from '@/views/blog/HomeView.vue'
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
  children: [Defaults, Article, ArticleList, UpdateLog, Tools]
}