import BlogHome from '../../components/blog/home'
import Article from './article.js';
import ArticleList from './articleList';
import UpdateLog from './updatelog';
import Blog from '../../views/blog/Blog.vue'
const defaults = {
  path: '',
  meta: {
    title: "YANSK'S BLOG",
    notshow: {
      loading: true
    }
  },
  component: BlogHome
}
export default {
  path: '/blog',
  name: 'blog',
  children: [defaults, Article, ArticleList, UpdateLog],
  component: Blog
}