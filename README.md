
## chrome-crawler

### 说明

- 一个简单的 chrome extension，抓取常看的博客

- 基于 ajax 请求 + jQury DOM parse

- 创意来自 `whxaxes` 的 [node-test](https://github.com/whxaxes/node-test/tree/master/server/creeper) 项目

- 为避免浪费请求，应用已经使用 localStorage 做了 10 min 的缓存，如需强制刷新，可以到点击页面提供的刷新按钮

### 使用

1. 下载代码并解压

2. 在扩展程序管理界面中选中 `开发者模式`

3. 点击 `加载已解压的扩展程序...` 按钮，选择代码所在文件夹

4. 打开方法1：直接点击图标

5. 打开方法2：找到扩展程序的 ID，地址栏中打开 `chrome-extension://{your_extension_id}/index.html`（可以加入到你的书签）

6. 添加自己喜欢的网页：修改 `./js/source.js` OR 点击页面上的“+”按钮填写对应的网址及选择器，也支持添加 rss XML 页面。

### rss 页面添加

| 内容          | 值示例        | 备注          |
| ------------- |:-------------:|:-------------:|
| 单列选择器    | rss.channel.entry |  `.` 分隔父子层级 |
| 内容选择器    | title             | 使用标签名        |
| 属性选择器    | link.$href        | 使用标签属性      |


### 

### Todo

- <del>添加自定义页面</del>

- <del>自定义数据来源</del>

- 代码重构

- 修改编辑数据源

- 添加更加完备的日期格式化（选择器、正则匹配）

----------


如有问题，欢迎与我联系：

- <a href="mailto:angusfu1126@qq.com">angusfu1126@qq.com</a>

- [https://segmentfault.com/u/wemlin](https://segmentfault.com/u/wemlin)

