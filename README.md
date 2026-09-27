# spoil

关于我

---

## 今晚去哪？｜上海夜晚出行计划

从华东师范大学闵行校区出发的晚饭与散步地点选择页。项目使用 React、Vite、Tailwind CSS，包含五条上海夜游路线与浏览器内餐厅 JSON 导入功能。

### 本地运行

```bash
pnpm install
pnpm dev
```

打开终端提示的本地地址即可预览。生产构建使用：

```bash
pnpm build
```

### 餐厅 JSON

在任一路线详情中选择“导入餐厅”，粘贴以下格式的一条数据：

```json
{
  "name": "餐厅名称",
  "area": "西岸滨江",
  "address": "详细地址（可选）",
  "tags": ["适合聊天", "晚饭"]
}
```

导入数据仅保存在当前页面会话，刷新页面后会清空；后续可以再接入本地存储或在线数据库。

### GitHub Pages 部署

1. 在仓库的 **Settings → Pages** 中，将 Source 设为 **GitHub Actions**。
2. 每次推送到 `main` 后，工作流会自动构建并发布网页；完成后可在 Actions 页面看到公开链接。

配置使用相对资源路径，因此仓库无论使用什么名称都可以部署到 GitHub Pages。
