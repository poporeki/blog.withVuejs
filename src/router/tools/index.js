import QRCode from './qrcode'
import PostCode from './postcode'
import ToolsIndex from '@/views/tools'
import DefaultView from '@/views/tools/DefaultView'
import ColorPicker from './colorPicker'
import HtmlEntity from './htmlEntity'

const defaultView = {
  path: '',
  meta: {
    title: '工具集',
    titleDescription: '内容持续添加中'
  },
  component: DefaultView
}
export default {
  path: 'tools',
  component: ToolsIndex,
  children: [defaultView, QRCode, PostCode, ColorPicker, HtmlEntity]
}