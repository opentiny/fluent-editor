# 贡献指南

很高兴你有意愿参与 TinyEditor 开源项目的贡献，参与贡献的形式有很多种，你可以根据自己的特长和兴趣选择其中的一个或多个：

- 报告[新缺陷](https://github.com/opentiny/fluent-editor/issues/new?assignees=&labels=%F0%9F%90%9B++bug&projects=&template=bug-report.yml&title=%F0%9F%90%9B+%5BBug%5D%3A+)
- 为[已有缺陷](https://github.com/opentiny/fluent-editor/labels/bug)提供更详细的信息，比如补充截图、提供更详细的复现步骤、提供最小可复现 demo 链接等
- 提交 Pull requests 修复文档中的错别字或让文档更清晰和完善
- 添加官方小助手微信 opentiny-official（备注：TinyEditor），加入技术交流群参与讨论

当你亲自使用 TinyEditor 富文本，并参与多次以上形式的贡献，对 TinyEditor 逐渐熟悉之后，可以尝试做一些更有挑战的事情，比如：

- 修复缺陷，可以先从 [Good-first issue](https://github.com/opentiny/fluent-editor/labels/good%20first%20issue) 开始
- 实现新特性
- 完善单元测试
- 翻译文档
- 参与代码检视

## 提交 Issue

如果你在使用 TinyEditor 富文本过程中遇到问题，欢迎给我们提交 Issue，提交 Issue 之前，请先仔细阅读相关的[官方文档](https://opentiny.github.io/fluent-editor)，确认这是一个缺陷还是尚未实现的功能。

如果是一个缺陷，创建新 Issue 时选择 [Bug report](https://github.com/opentiny/fluent-editor/issues/new?assignees=&labels=%F0%9F%90%9B++bug&projects=&template=bug-report.yml&title=%F0%9F%90%9B+%5BBug%5D%3A+) 模板，标题示例：`在表格模块中，设置单元格背景色并保存之后，下次渲染单元格背景色丢失`。

报告缺陷的 Issue 主要需要填写以下信息：

- `@opentiny/fluent-editor` 的版本号
- 缺陷的表现，可截图辅助说明，如果有报错可贴上报错信息
- 缺陷的复现步骤，最好能提供一个最小可复现 demo 链接

如果是一个新特性，则选择 [Feature request](https://github.com/opentiny/fluent-editor/issues/new?assignees=&labels=%E2%9C%A8+feature&projects=&template=feature-request.yml&title=%E2%9C%A8+%5BFeature%5D%3A+) 模板，标题示例：`希望增加格式刷的功能`。

新特性的 Issue 主要需要填写以下信息：

- 该特性主要解决用户的什么问题
- 该特性的 api 是什么样的

## 提交 PR

提交 PR 之前，请先确保你提交的内容是符合 TinyEditor 整体规划的，一般已经标记为 [bug](https://github.com/opentiny/fluent-editor/labels/bug) 的 Issue 是鼓励提交 PR 的，如果你不是很确定，可以创建一个 [Discussion](https://github.com/opentiny/fluent-editor/discussions) 进行讨论。

### Pull Request 规范

#### Commit 信息

commit 信息要以 `type(scope): 描述信息` 的形式填写，例如 `fix(table): the background color of table cells can't be saved`。

1. type: 必须是 build, chore, ci, docs, feat, fix, perf, refactor, revert, release, style, test, improvement 中的一个。

2. scope:

一般用 `packages/fluent-editor/src`目录下的模块名，比如：`table, mention, link ...`

#### Pull Request 的标题

1. 标题的规范与 commit 信息一样，以`type(scope): 描述信息` 的形式填写。

2. 标题示例:

- 补充 mention 模块的文档： `docs(mention): xxx`
- 补充 mention 模块的测试用例: `test(mention): xxx`
- 修复 mention 模块的缺陷: `fix(mention): xxx`

#### Pull Request 的描述

PR 描述使用了模板，需要按照模板填写 PR 相关信息，主要包括：

- PR 自检项：Commit 信息是够符合规范、是否补充了 E2E 测试用例、是否补充了文档
- PR 类型：缺陷修复、新特性、代码格式调整、重构等
- 关联的 Issue 编号
- 是否包含破坏性变更

### 本地启动步骤

- 点击 [TinyEditor](https://github.com/opentiny/fluent-editor) 代码仓库右上角的 Fork 按钮，将上游仓库 Fork 到个人仓库
- Clone 个人仓库到本地
- 关联上游仓库，方便同步上游仓库最新代码
- 在 TinyEditor 根目录下运行 `pnpm i`，安装依赖
- 运行 `pnpm dev`，启动富文本网站
- 打开浏览器访问：[http://localhost:5173/fluent-editor/](http://localhost:5173/fluent-editor/)

```shell
# username 为用户名，执行前请替换
git clone git@github.com:username/fluent-editor.git
cd fluent-editor

# 关联上游仓库
git remote add upstream git@github.com:opentiny/fluent-editor.git

# 安装依赖
pnpm i

# 启动本地项目
pnpm dev
```

### 提交 PR 的步骤

- 请确保你已经完成本地启动中的步骤，并能正常访问：[http://localhost:5173/fluent-editor/](http://localhost:5173/fluent-editor/)
- 同步上游仓库 main 分支最新代码：git pull upstream main
- 从上游仓库 main 分支创建新分支 `git checkout -b username/feature1 upstream/main`，分支名字建议为 `username/feat-xxx` / `username/fix-xxx`
- 本地编码
- 遵循 [Commit Message Format](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范进行提交，不符合提交规范的 PR 将不会被合并
- 提交到远程仓库：git push origin branchName
- 打开 TinyEditor 代码仓库的 [Pull requests](https://github.com/opentiny/fluent-editor/pulls) 链接，点击 New pull request 按钮提交 PR
- 按照 PR 模板补充相关信息，包括 PR 自检项、PR 类型、关联的 Issue 编号、是否是破坏性变更
- 项目 Committer 进行 Code Review，并提出意见
- PR 作者根据意见调整代码，请注意一个分支发起了 PR 后，后续的 commit 会自动同步，无需重新提交 PR
- 项目管理员合并 PR

贡献流程结束，感谢你的贡献！

## 加入开源社区

如果你对我们的 TinyEditor 开源项目感兴趣，欢迎通过以下方式加入我们的开源社区。

- 添加官方小助手微信：opentiny-official（备注：TinyEditor），加入我们的技术交流群

如果你给 TinyEditor 提交过 Issue 或 PR，请在 Issue 或 PR 下面评论以下内容，添加自己到贡献者列表里。

```
@all-contributors please add @<username> for <contributions>
```

详细规则可以参考：[https://allcontributors.org/docs/en/bot/usage](https://allcontributors.org/docs/en/bot/usage)

我们诚挚感谢每位参与过 TinyEditor 开源项目贡献的开发者们！❤
