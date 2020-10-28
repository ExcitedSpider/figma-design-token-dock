# figma plugin template

figma 插件的基本模版，从[figma text lint](https://git.woa.com/tad-ag/figma-text-lint) 插件项目中提取独立出来。可以方便地起步一个 figma 插件的编写。

## 使用

1. fork 本项目
2. 安装依赖并运行

   ```bash
   npm i
   npm run start
   ```

3. 在 [figma desktop](https://www.figma.com/downloads/)中 load 本地插件

   > 个人空间 - plugins - create new plugin - link existing plugin

4. 打开任意设计文件，然后运行插件

   > 点击左上角 '三' 按钮 - plugins - development

## 发布

发布请参考 figma 社区的[插件指南](https://www.figma.com/plugin-docs/publishing/)

## 为什么使用这个模版？

相比较于 figma 官方提供的比较简单的模版，我们的模版有更加好的一些特性:

### 公共特性

- 全面 TypeScript 化
- eslint 接入腾讯规范
- prettier 配置
- webpack 打包
- 更明确的目录结构
  > config + service + ui

### UI 部分

- [React](https://github.com/facebook/react) 支持 (包括 [react-router](https://github.com/ReactTraining/react-router) )
- Post CSS 能力: [CSS Modules](https://github.com/css-modules/css-modules) 支持

### Service 部分

- 提供开箱即用的 handler 类

  ```js
  const handler = new MessageHandler();

  handler.use(figma.ui);
  // 处理从 ui 发来的 ‘plugin-start’ 事件
  handler.on('plugin-start', msg => {
    console.log('welcome~');
  });
  ```

- 提供一些实用方法

  - util.traverseNode 递归遍历一个节点
  - util.tranverseSelectNodes 递归遍历节点数组
  - util.findNodeIndex 获取节点在 group 中的序号

## 联系我

mailto: qefeng@tencent.com
