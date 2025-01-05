import FluentEditor from './core/fluent-editor'
import { FontStyle, LineHeightStyle, SizeStyle, TextIndentStyle } from './attributors'
import BetterTable from './table/better-table' // 表格
import CustomClipboard from './custom-clipboard' // 粘贴板
import Counter from './counter' // 字符统计
import DividerBlot from './divider' // 分割线
import Emoji from './emoji' // 表情
import FileModule from './file' // 文件
// import GlobalLink from './global-link' // 全局链接
import I18N from './i18n'
import Icons from './ui/icons'
import Image from './custom-image/BlotFormatter' // 图片
import Link from './link' // 超链接
import MathliveBlot from './mathlive/formats'
import MathliveModule from './mathlive' // latex公式
import Mention from './mention/Mention' // @提醒
// import QuickMenu from './quick-menu' // 快捷菜单
import SnowTheme from './themes/snow'
import SoftBreak from './soft-break' // 软回车
import Strike from './strike' // 删除线
import Syntax from './syntax' // 代码块高亮
import Toolbar from './toolbar' // 工具栏
import Uploader from './custom-uploader' // 上传
import Video from './video' // 视频

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
