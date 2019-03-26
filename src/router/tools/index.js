import QRCode from './qrcode'
import Tools from '@/views/tools'

export default {
  path: 'tools',
  component: Tools,
  children: [QRCode]
}