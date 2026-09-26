# Afteraccepted

五位朋友的创作工作室。软件、Skills、插件，以及《Accepted之后》播客。

**网站：** https://franklai.com/After-Accepted/

GitHub Pages 地址 https://franklai-rise.github.io/After-Accepted/ 会跳转到该地址。

## 当前版本

- 参考用户指定的牛牛 NiuNiu 网站：开放双栏首屏、紧凑导航、细边框卡片和深色收尾区域。奶油白、墨绿、木色与暖金色取自用户提供的四张图片。
- 作品分类筛选、类别详情、播客单集展开、移动端导航。
- 响应式布局、键盘操作、系统减少动态效果偏好。
- 原生 HTML、CSS 和 JavaScript，无第三方运行依赖和统计追踪。
- GitHub Actions 只发布站点文件，提交到 `main` 后自动更新 GitHub Pages。

## 本地预览

安装 Node.js 22 或更高版本后，在项目目录运行：

```sh
npm run dev
```

打开 http://127.0.0.1:4173/ 。不需要安装依赖。

```sh
npm run check
npm run build
```

生成的 `dist/` 是待发布目录，不提交到仓库。首次托管需要在仓库 Settings → Pages 中选择 GitHub Actions。

## 补充内容

主要内容集中在 `site-data.js`：

1. **作品**：往 `projects` 添加条目。`category` 为 `software`、`skills` 或 `plugins`；提供名称、介绍、状态、项目地址，图片放在 `assets/`。有正式作品的类别会自动以作品卡片替换类别占位卡片。
2. **播客平台**：向 `podcast.platforms` 添加已确认的节目地址。
3. **单集**：在 `podcast.episodes` 填写正式标题、介绍、单集地址 `url`。有可公开直接访问的音频时填 `audioUrl`，页面才显示播放器。不支持自动抓取 RSS；以后可按实际托管方式增加。
4. **成员**：在 `index.html` 的 `about` 区块更新。目前的 Frank、Jasper、Jimmy、Kevin、Harry 来自用户提供的五人海报文字；没有编写未经提供的职责或个人履历。
5. **图片**：首页为 `assets/studio-friends.webp`，播客介绍为 `assets/podcast-cover.webp`，单集为 `assets/episode-01.webp` 和 `assets/episode-02.webp`。均以完整正方形比例显示，不裁剪人物或海报文字。替换时同步更新图片替代文字及尺寸。

播客简介、口号和两期主题参考用户提供的“设计播客”会话。EP01 展示标题已按用户此次提供的海报更新为“意识是什么？”。未填入虚构的音频、时长、发布日期、成员职责或作品下载链接。

## 素材与权利

- 当前四张图片由用户提供，仅转换成 WebP 以改善加载速度，未修改画面内容；本地 PNG 原文件未作更改。
- 首版生成的银蓝色素材保留于版本历史，当前页面不再使用。
- 品牌字标和界面独立编排；参考牛牛网站的布局风格，没有复制其源代码、产品图像或访问统计设置。
- 本仓库暂未授予开源许可证；公开可见不等于授予任意复用权。可由团队后续选择合适的许可证。
