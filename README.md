# figma text-lint 插件

本项目是一个 [figma](https://www.figma.com/) 插件。figma 是一个基于 web 技术的设计协作工具。

本插件的主要功能是检查中文语境下的文本规范。包括：

- 英文与中文连接处需要有空格.
- 最小字号(默认 12px，可配置).
- 最小行高(默认中文 1.5 倍，西文 1.2 倍，暂不开放配置)

## wiki 主页

https://iwiki.woa.com/pages/viewpage.action?pageId=359790136

## 运行本项目

1. [安装 figma desktop](https://www.figma.com/downloads/)

2. 在 figma desktop 中装载本插件

   1. account
   2. Plugins
   3. In Development
   4. create new plugin
   5. link existing plugin
   6. choose manifest.json

3. 安装依赖

   ```bash
   npm i
   ```

4. 执行编译

   ```bash
   npm run start
   ```

5. 调用插件
   1. 在 figma desktop 中打开任意 figma 文件
   2. 左上角菜单栏 -> Plugins -> Development -> textLint

## 打包

```bash
npm run build
```
