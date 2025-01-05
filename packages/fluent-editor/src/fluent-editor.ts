import { FontStyle, LineHeightStyle, SizeStyle, TextIndentStyle } from './attributors'
import FluentEditor from './core/fluent-editor'
import SoftBreak from './formats/soft-break' // 软回车
import Strike from './formats/strike' // 删除线
import Video from './formats/video' // 视频
import Counter from './modules/counter' // 字符统计
import CustomClipboard from './modules/custom-clipboard' // 粘贴板
import Image from './modules/custom-image/BlotFormatter' // 图片
import Uploader from './modules/custom-uploader' // 上传
import DividerBlot from './modules/divider' // 分割线
import Emoji from './modules/emoji' // 表情
import FileModule from './modules/file' // 文件
// import GlobalLink from './modules/global-link' // 全局链接
import I18N from './modules/i18n'
import Link from './modules/link' // 超链接
import MathliveModule from './modules/mathlive' // latex公式
import MathliveBlot from './modules/mathlive/formats'
import Mention from './modules/mention/Mention' // @提醒
import Syntax from './modules/syntax' // 代码块高亮
import BetterTable from './modules/table/better-table' // 表格
import Toolbar from './modules/toolbar' // 工具栏
// import QuickMenu from './modules/quick-menu' // 快捷菜单
import SnowTheme from './themes/snow'
import Icons from './ui/icons'

FluentEditor.register(
  {
    'formats/emoji': Emoji.EmojiBlot,
    'formats/font': FontStyle,
    'formats/line-height': LineHeightStyle,
    [`formats/${MathliveBlot.blotName}`]: MathliveBlot,
    'formats/size': SizeStyle,
    'formats/softBreak': SoftBreak,
    'formats/strike': Strike,
    'formats/text-indent': TextIndentStyle,
    'formats/video': Video,

    'modules/clipboard': CustomClipboard,
    'modules/counter': Counter,
    'modules/divider': DividerBlot,
    'modules/emoji-shortname': Emoji.ShortNameEmoji,
    'modules/emoji-toolbar': Emoji.ToolbarEmoji,
    'modules/file': FileModule,
    // 'modules/global-link': GlobalLink, // TODO
    'modules/i18n': I18N,
    'modules/image': Image,
    'modules/link': Link,
    'modules/mathlive': MathliveModule,
    'modules/mention': Mention,
    // 'modules/quickmenu': QuickMenu, // TODO
    'modules/syntax': Syntax,
    'modules/toolbar': Toolbar,
    'modules/uploader': Uploader,
    // make sure register after `HeaderList`
    'modules/better-table': BetterTable,

    'themes/snow': SnowTheme,

    'ui/icons': Icons,
  },
  true, // 覆盖内部模块
)

export default FluentEditor
