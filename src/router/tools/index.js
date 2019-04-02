import QRCode from './qrcode'
import PostCode from './postcode'
import Tools from '@/views/tools'
import Default from '@/views/tools/defaults'
import ColorPicker from './colorPicker'
const defaults = {
  path: '',
  meta: {
    title: '工具集',
    titleDescription: '内容持续添加中'
  },
  component: Default
}
export default {
  path: 'tools',
  component: Tools,
  children: [defaults, QRCode, PostCode, ColorPicker]
}