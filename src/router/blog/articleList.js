import Aritclelist from '../../components/blog/articlelist'
import Allarticles from '../../components/blog/articlelist/AllarticlesItem.vue'
export default {
  path: 'articlelist',
  component: Aritclelist,
  children: [{
    path: '',
    component: Allarticles
  }]
}