# 博客站点模块操作指南

本文面向当前这个 Academic Pages 博客仓库，重点说明每个模块的文件负责什么、平时应该改哪里、哪些目录不要手动改。

## 先记住这几个原则

1. 平时预览站点，优先运行 `./scripts/dev.sh`。
2. 改了 `_config.yml` 之后，需要重启本地服务，不能只等自动刷新。
3. 内容优先改 Markdown 文件，样式优先改 `_sass/` 和 `assets/`，不要直接改生成结果。
4. `/_site`、`vendor/`、`.bundle/`、`.sass-cache/` 这类目录不要手动维护。

## 目录总览

| 模块 | 主要路径 | 作用 | 你最常做的事 |
| --- | --- | --- | --- |
| 站点总配置 | `_config.yml` | 全站标题、作者、头像、链接、主题、仓库地址 | 改站点名、个人信息、站点地址 |
| 顶部导航 | `_data/navigation.yml` | 顶部菜单顺序和显示项 | 增删菜单、调整顺序 |
| 首页和独立页面 | `_pages/` | 首页、CV、出版物页、归档页等 | 改首页内容、新增自定义页面 |
| 博客文章 | `_posts/` | 普通博客文章 | 新增文章、改标签 |
| 论文/出版物 | `_publications/` | 论文、论文详情页 | 新增论文、挂 PDF 链接 |
| 演讲/报告 | `_talks/` | Talk、报告、讲座 | 新增演讲条目 |
| 教学经历 | `_teaching/` | 课程、教学活动 | 新增教学经历 |
| 作品集 | `_portfolio/` | 项目展示 | 展示项目、放截图 |
| 数据文件 | `_data/` | 导航、CV JSON、作者等结构化数据 | 改导航、同步 CV 数据 |
| 模板片段 | `_includes/` | 页头、页脚、卡片、侧边栏等复用片段 | 微调局部页面结构 |
| 页面布局 | `_layouts/` | 页面总布局模板 | 调整整类页面结构 |
| 样式 | `_sass/`、`assets/css/main.scss` | 主题、布局、颜色、排版 | 改配色、字体、间距 |
| 前端脚本 | `assets/js/` | 主题切换、交互行为 | 改交互逻辑 |
| 静态资源 | `images/`、`files/` | 图片、PDF、附件 | 上传头像、论文、简历 PDF |
| 批量生成脚本 | `scripts/`、`markdown_generator/` | 本地启动、CV 同步、批量生成条目 | 预览站点、批量导入论文/讲座 |

## 1. 站点总配置

### 1.1 `_config.yml`

这是全站最重要的配置文件，建议优先完成下面这些字段：

- `title`：站点标题。
- `name`：站点名。
- `description`：站点简介。
- `url`：你的站点地址，通常应改成 `https://你的用户名.github.io`。
- `repository`：你的 GitHub 仓库，例如 `NeoAxiomN/NeoAxiomN.github.io`。
- `author`：侧边栏作者信息，包括头像、姓名、简介、地点、单位、社交链接等。
- `site_theme`：站点主题，当前可选 `default`、`air`、`sunrise`、`mint`、`dirt`、`contrast`。

常见操作：

- 想改左侧头像：修改 `author.avatar`，并把图片放到 `images/`。
- 想改左侧简介：修改 `author.bio`。
- 想改 GitHub、Google Scholar、ORCID 等外链：修改 `author` 下对应字段。
- 想切换站点主题：改 `site_theme`。

注意：

- 改完 `_config.yml` 后，需要重启 `./scripts/dev.sh`。
- 这个文件里现在还有不少模板默认值，正式上线前最好全部替换成你自己的信息。

### 1.2 `_data/navigation.yml`

这个文件控制顶部导航栏。

常见操作：

- 调整菜单顺序：直接调整条目顺序。
- 隐藏某个页面：把对应条目删除，或像示例一样注释掉。
- 新增页面入口：新增一条 `title + url`。

注意：

- 导航删掉以后，只是不在菜单里显示，不代表页面文件被删除。
- 页面地址要和对应页面的 `permalink` 对上。

## 2. 首页和独立页面

### 2.1 `_pages/about.md`

当前这个文件就是首页，因为它的 `permalink` 是 `/`。

适合放的内容：

- 个人介绍
- 研究方向
- 博客首页引导
- 个人照片、链接、说明文字

常见操作：

- 直接改正文内容即可。
- 想让首页完全换成你自己的介绍，这个文件通常是第一优先级。

### 2.2 `_pages/` 目录下其他页面

这里还放着很多独立页面，例如：

- `_pages/publications.html`
- `_pages/talks.html`
- `_pages/teaching.html`
- `_pages/portfolio.html`
- `_pages/year-archive.html`
- `_pages/cv.md`
- `_pages/cv-json.md`

一般规则：

- `.md` 文件适合以 Markdown 为主的内容页。
- `.html` 文件适合带模板逻辑或复杂布局的页面。
- 如果只是改页面标题、简介、正文，优先改页面文件本身。
- 如果页面列表结构不满意，再去看 `_layouts/` 或 `_includes/`。

如果你想加一个新页面，最简单的做法是：

1. 在 `_pages/` 新建一个 `.md` 文件。
2. 写好 YAML 头信息。
3. 设置 `permalink`。
4. 去 `_data/navigation.yml` 给它加入口。

一个最小示例：

```md
---
layout: archive
title: "新页面"
permalink: /new-page/
author_profile: true
---

这里写页面正文。
```

## 3. 博客文章模块

### 3.1 `_posts/`

这是普通博客文章目录。

文件命名规则：

- `YYYY-MM-DD-slug.md`
- 例如：`2026-05-08-my-first-post.md`

常见字段：

```md
---
title: "文章标题"
date: 2026-05-08
permalink: /posts/2026/05/my-first-post/
tags:
  - 标签1
  - 标签2
---
```

常见操作：

- 发新博客：新建一个 `.md` 文件。
- 改文章正文：直接改正文 Markdown。
- 改标签归档：修改 `tags`。

注意：

- 文件名日期和 `date` 最好保持一致。
- `permalink` 可以自定义，但建议保持统一风格。
- 如果不想文章马上显示，别把日期写到未来，除非你就是要定时展示。

## 4. 学术内容模块

### 4.1 `_publications/`

这里放论文、出版物、预印本等条目，每个文件对应一篇内容。

常见字段：

```md
---
title: "论文标题"
collection: publications
category: manuscripts
permalink: /publication/2026-05-08-paper-slug
excerpt: "论文摘要短句"
date: 2026-05-08
venue: "期刊或会议名"
paperurl: "https://你的站点/files/paper.pdf"
citation: "你的引用格式"
---
```

常见操作：

- 新增论文：复制一个现有文件改内容。
- 上传论文 PDF：把 PDF 放进 `files/`，再把 `paperurl` 指过去。
- 调整分类：改 `category`，常见值有 `manuscripts`、`conferences`、`books`。

注意：

- 文件名建议带日期，方便排序。
- `paperurl` 如果指向你自己的站点附件，通常会放在 `files/`。

### 4.2 `_talks/`

这里放讲座、报告、分享、tutorial 等条目。

常见字段：

```md
---
title: "报告标题"
collection: talks
type: "Talk"
permalink: /talks/2026-05-08-talk-slug
venue: "会议或学校"
date: 2026-05-08
location: "城市, 国家"
---
```

常见操作：

- 新增报告：新增一个 Markdown 文件。
- 调整报告类型：改 `type`，比如 `Talk`、`Tutorial`、`Workshop`。
- 写详情页：在 YAML 后面直接补正文。

注意：

- `location` 会影响 talk map 等扩展功能。
- 如果你以后要生成地图，这里的地点信息最好保持规范。

### 4.3 `_teaching/`

这里放课程、助教、讲课、工作坊等教学经历。

常见字段：

```md
---
title: "课程名"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/2026-spring-course-name
venue: "学校或院系"
date: 2026-03-01
location: "城市, 国家"
---
```

常见操作：

- 加一门课：新增一个 Markdown 文件。
- 写课程介绍：正文写内容。
- 改课程类型：改 `type`。

### 4.4 `_portfolio/`

这里适合放项目展示、作品案例、项目页面。

常见字段：

```md
---
title: "项目名"
excerpt: "列表页显示的短描述"
collection: portfolio
---
```

常见操作：

- 展示项目：新建一个条目。
- 放项目图：把图片放 `images/`，然后在 `excerpt` 或正文里引用。
- 如果想写复杂展示页，可以用 `.html` 文件而不只是 `.md`。

## 5. CV 模块

这个仓库有两套 CV 相关内容：

- `_pages/cv.md`：Markdown 版 CV。
- `_pages/cv-json.md` + `_data/cv.json`：JSON 驱动版 CV。

### 5.1 改 Markdown CV

如果你导航栏里用的是 `/cv/`，优先改 `_pages/cv.md`。

适合直接手改的部分：

- 教育经历
- 工作经历
- 技能
- 服务和领导力

其中“Publications / Talks / Teaching”这些段落会自动遍历对应集合，所以你只要维护 `_publications/`、`_talks/`、`_teaching/` 即可。

### 5.2 改 JSON CV

如果你在用 `/cv-json/` 页面，或者想保留结构化简历数据，就改 `_data/cv.json`。

更稳妥的同步方式：

```bash
python3 scripts/cv_markdown_to_json.py --input _pages/cv.md --output _data/cv.json --config _config.yml
```

常见建议：

- 只维护一个“主版本”。
- 如果你主要看 `/cv/`，就把 `_pages/cv.md` 当主版本。
- 如果你主要依赖 JSON 导出，再同步 `_data/cv.json`。

## 6. 静态资源模块

### 6.1 `images/`

放图片资源，例如：

- 头像
- 首页配图
- 项目截图
- favicon

常见操作：

- 替换头像：上传新图到 `images/`，再改 `_config.yml` 中的 `author.avatar`。
- 文章插图：在 Markdown 里用 `/images/文件名` 引用。

### 6.2 `files/`

放附件资源，例如：

- 论文 PDF
- Slides
- 简历 PDF
- 其他下载文件

常见操作：

- 上传论文：放到 `files/` 后，在出版物条目里写 `paperurl`。
- 上传简历 PDF：放 `files/cv.pdf`，这样 `cv-json` 页面里的下载按钮就能直接用。

## 7. 模板与页面结构

### 7.1 `_includes/`

这是局部可复用组件目录，比如：

- 侧边栏
- 页头
- 页脚
- 归档列表卡片
- SEO 片段
- 评论组件

什么时候改这里：

- 你想改某个小区域，而且这个区域在很多页面重复出现。
- 你想给全站头部或页脚加额外 HTML。

你目前特别可能会用到：

- `_includes/head/custom.html`：加自定义头部内容，例如 favicon、额外样式、统计脚本。
- `_includes/footer/custom.html`：加页脚脚本，例如 MathJax、Mermaid、自定义链接。

### 7.2 `_layouts/`

这是页面总布局目录，控制整类页面怎么拼装。

什么时候改这里：

- 你觉得页面整体结构不对。
- 你要改文章页、列表页、单页的统一布局。

注意：

- 这里比 `_includes/` 更底层，改动影响面更大。
- 先确认是不是页面文件本身能解决，再动 layout。

## 8. 样式与前端脚本

### 8.1 `_sass/` 和 `assets/css/main.scss`

样式主入口是 `assets/css/main.scss`，它会导入 `_sass/` 下的主题和布局文件。

常见操作：

- 改主题配色：看 `_sass/theme/`
- 改页面布局：看 `_sass/layout/`
- 改通用变量和断点：看 `_sass/_themes.scss`、`_sass/include/`

建议：

- 小范围改动先找最接近的局部文件。
- 不要把所有样式都堆到一个地方。

### 8.2 `assets/js/`

这里放前端交互逻辑。

关键文件：

- `assets/js/_main.js`：源码入口。
- `assets/js/main.min.js`：压缩后的产物，页面实际引用的是它。
- `assets/js/theme.js`：主题相关脚本。

如果你改了 `assets/js/_main.js`，需要重新生成压缩文件：

```bash
npm install
npm run build:js
```

注意：

- 平时只手改源码文件，不手改压缩后的 `main.min.js`。
- 真正提交前，再执行一次打包。

## 9. 数据与自动生成

### 9.1 `_data/`

这里放结构化数据文件。

常见文件：

- `_data/navigation.yml`：导航栏
- `_data/cv.json`：JSON CV
- `_data/authors.yml`：作者信息扩展
- `_data/ui-text.yml`：界面文本

什么时候改这里：

- 配置型内容适合放这里。
- 同一份数据要被多个页面复用时，也适合放这里。

### 9.1.1 EEG Tracker 的独立目录

为了不和模板原有文件混在一起，这条 EEG tracker 现在统一放在各类型目录下的 `efm_tracker/` 子目录里：

- 数据：`_data/efm_tracker/efm_models.yml`
- 模板：`_includes/efm_tracker/efm_tracker.html`
- 文章：`_posts/efm_tracker/2026-05-11-neuroscience-foundation-models-and-llm-systems-tracker.md`
- 样式：`_sass/layout/efm_tracker/_efm_tracker.scss`
- 脚本：`assets/js/efm_tracker/efm_tracker.js`

以后如果你继续维护这条 tracker，优先只在这几个位置改，不需要再和旧模板文件混着找。

### 9.2 `markdown_generator/`

这是批量生成内容的工具目录，适合你以后内容很多的时候用。

可以做什么：

- 用 `publications.py` 根据 `publications.csv` 或 `publications.tsv` 批量生成 `_publications/` 文件。
- 用 `talks.py` 根据 `talks.tsv` 批量生成 `_talks/` 文件。
- 用 notebook 做更可视化的导入处理。

适合场景：

- 你已经在 Excel、CSV、TSV 里维护了很多论文或讲座。
- 你不想一篇一篇手工新建 Markdown。

## 10. 本地运行与脚本

### 10.1 `scripts/dev.sh`

这是当前仓库在 macOS 上最推荐的启动入口。

用途：

- 自动优先使用 Homebrew Ruby
- 自动安装 bundle 依赖
- 自动加载兼容层
- 启动本地 Jekyll 服务

常用命令：

```bash
./scripts/dev.sh
./scripts/dev.sh build
```

### 10.2 `scripts/ruby_compat.rb`

这是为了让老版本 Jekyll 在较新的 Ruby 上正常运行的兼容文件。

结论很简单：

- 平时不用手改。
- 只有 Ruby 兼容问题时才看它。

### 10.3 `scripts/cv_markdown_to_json.py`

这是把 Markdown CV 转成 JSON CV 的脚本。

适合在你已经改完 `_pages/cv.md`，又想同步 `_data/cv.json` 时使用。

## 11. 不要手改的目录

下面这些目录或文件，原则上都不应该作为“内容源”去维护：

- `_site/`
- `vendor/`
- `.bundle/`
- `.sass-cache/`

原因：

- `_site/` 是构建产物，每次重新构建都可能被覆盖。
- `vendor/` 和 `.bundle/` 是依赖安装目录。
- `.sass-cache/` 是缓存目录。

如果你发现网页显示有问题，不要先去改这些目录，先回头检查真正的源文件：

- 内容源：`_pages/`、`_posts/`、`_publications/`、`_talks/`、`_teaching/`、`_portfolio/`
- 样式源：`_sass/`、`assets/css/main.scss`
- 脚本源：`assets/js/_main.js`
- 全局配置：`_config.yml`、`_data/navigation.yml`

## 12. 最常见的维护动作速查

### 改站点标题、简介、头像

- 改 `_config.yml`
- 图片放 `images/`

### 改首页内容

- 改 `_pages/about.md`

### 新增博客文章

- 在 `_posts/` 新建 `YYYY-MM-DD-slug.md`

### 新增论文

- 在 `_publications/` 新建条目
- PDF 放 `files/`

### 新增演讲

- 在 `_talks/` 新建条目

### 新增教学经历

- 在 `_teaching/` 新建条目

### 新增项目展示

- 在 `_portfolio/` 新建条目
- 截图放 `images/`

### 新增自定义页面

- 在 `_pages/` 新建 `.md` 或 `.html`
- 在 `_data/navigation.yml` 增加菜单入口

### 改顶部导航

- 改 `_data/navigation.yml`

### 改全站样式

- 先看 `_sass/theme/` 和 `_sass/layout/`

### 改前端交互

- 改 `assets/js/_main.js`
- 然后运行 `npm run build:js`

### 本地预览

- 运行 `./scripts/dev.sh`

## 13. 推荐维护顺序

如果你准备把这个模板真正改成自己的博客，建议按下面顺序推进：

1. 先改 `_config.yml` 里的站点名、URL、仓库地址、作者信息。
2. 再改 `_pages/about.md`，把首页替换成你自己的内容。
3. 然后清理 `_posts/`、`_publications/`、`_talks/`、`_teaching/`、`_portfolio/` 里的示例内容。
4. 再改 `_data/navigation.yml`，把你暂时不用的栏目隐藏掉。
5. 最后再做样式和模板层面的调整。

这样改最稳，因为你会先把“内容正确”做完，再去追求“视觉更像你自己”。
