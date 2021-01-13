(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{328:function(t,s,e){t.exports=e.p+"assets/img/naming-config.a7bbfe3e.png"},357:function(t,s,e){t.exports=e.p+"assets/img/design-system.19646f72.png"},358:function(t,s,e){t.exports=e.p+"assets/img/usage-step-1.bcb108e3.png"},359:function(t,s,e){t.exports=e.p+"assets/img/usage-step-2.132f685f.png"},360:function(t,s,e){t.exports=e.p+"assets/img/styles-zh.e7e65b26.png"},361:function(t,s,e){t.exports=e.p+"assets/img/description-naming.752cedcb.png"},362:function(t,s,e){t.exports=e.p+"assets/img/usage-create-pr.9b9a96b7.png"},370:function(t,s,e){"use strict";e.r(s);var n=e(42),a=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"design-token-dock"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#design-token-dock"}},[t._v("#")]),t._v(" Design Token Dock")]),t._v(" "),n("p",[t._v("本 figma 插件用于导出 figma 样式为 JSON 格式。支持导出方式：")]),t._v(" "),n("ul",[n("li",[t._v("直接复制")]),t._v(" "),n("li",[t._v("下载保存为 .json 文件")]),t._v(" "),n("li",[t._v("发起 Github PR")])]),t._v(" "),n("p",[n("a",{attrs:{href:"https://www.figma.com/community/plugin/903167004921142962/Design-Token-Dock-%2F-%E6%A0%B7%E5%BC%8F%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7",target:"_blank",rel:"noopener noreferrer"}},[t._v("Figma Plugin Link 🔗"),n("OutboundLink")],1)]),t._v(" "),n("h2",{attrs:{id:"背景"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("Design Token 是什么？")]),t._v(" "),n("p",[t._v("设计师通常在进行网页设计前，会定义一套"),n("a",{attrs:{href:"https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969",target:"_blank",rel:"noopener noreferrer"}},[t._v("设计系统"),n("OutboundLink")],1),t._v("。通常设计系统包含色盘、分级别的字体字号行高、边距规范、符号 icon 等等。在后续的设计中，设计稿会遵循设计系统的规范，从而保持一致性。")]),t._v(" "),n("p",[t._v("例 "),n("a",{attrs:{href:"https://www.figma.com/community/file/928108847914589057/UI2%3A-Figma's-Design-System",target:"_blank",rel:"noopener noreferrer"}},[t._v("figma ui"),n("OutboundLink")],1),t._v(" 设计系统中的色盘定义:\n"),n("img",{attrs:{src:e(357),alt:"figma color design system"}})]),t._v(" "),n("p",[t._v("web 开发者在开发时，会将设计系统定义为 css 变量、scss 变量、js 变量等等形式进行引用。这些根据设计系统定义的一些程序变量可以理解为 "),n("strong",[t._v("Design Token")]),t._v("。")]),t._v(" "),n("p",[t._v("例 定义在css变量中的 design-token:")]),t._v(" "),n("div",{staticClass:"language-css extra-class"},[n("pre",{pre:!0,attrs:{class:"language-css"}},[n("code",[n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(":root")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("--theme-blue")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #18a0fb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("--theme-purple")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #7b61ff"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("--sm-font-size")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 14px"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("--md-font-size")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 16px"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v("--lg-font-size")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 20px"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("Design Token & Figma")]),t._v(" "),n("p",[t._v("开发者手动编写 Design Token 的过程是非常枯燥的，且容易出错。如果可以从设计师使用的设计工具中直接导出 token，是省事又省力的。正好 figma 支持用户定义 "),n("a",{attrs:{href:"https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma",target:"_blank",rel:"noopener noreferrer"}},[t._v("style"),n("OutboundLink")],1),t._v("，我就编写了这个插件，能够将 figma 样式自动导出 Design Token JSON 文件。")]),t._v(" "),n("p",[t._v("除了通常的导出文件之外，本插件还支持发起 github pull request。可以写一些 github action 脚本，来实现 design token npm 包发布的自动化:")]),t._v(" "),n("div",{staticClass:"language-yml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-yml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("pull_request")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("types")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" closed "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("merge_job")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 监控 pull request merged 事件，执行 action 任务")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" github.event.pull_request.merged == true\n    "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" echo PR $"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" github.event.number "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" has been merged\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# body 中存放了 design token 数据")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" echo PR Issue body '$"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" github.event.pull_request.body "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("'\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# .")]),t._v("\n")])])]),n("p",[t._v("具体例子可以参考: "),n("a",{attrs:{href:"https://github.com/ExcitedSpider/adui-design-token/blob/master/.github/workflows/pr-merged.yml",target:"_blank",rel:"noopener noreferrer"}},[t._v("adui design token"),n("OutboundLink")],1),t._v("。该 design token 库通过本插件实现了直接发布 design token npm 包。")])])]),t._v(" "),n("h2",{attrs:{id:"安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),n("p",[t._v("从 "),n("a",{attrs:{href:"https://www.figma.com/community/plugin/903167004921142962/Design-Token-Dock-%2F-%E6%A0%B7%E5%BC%8F%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7",target:"_blank",rel:"noopener noreferrer"}},[t._v("figma community"),n("OutboundLink")],1),t._v(" 中安装。")]),t._v(" "),n("h2",{attrs:{id:"使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("从右上角菜单栏启动插件\n"),n("img",{attrs:{src:e(358),alt:"step1"}})])]),t._v(" "),n("li",[n("p",[t._v("选择一些包含 figma style 的节点\n"),n("img",{attrs:{src:e(359),alt:"step2"}})])]),t._v(" "),n("li",[n("p",[t._v("选择一种导出方式即可导出 json")])])]),t._v(" "),n("h3",{attrs:{id:"token-命名问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#token-命名问题"}},[t._v("#")]),t._v(" token 命名问题")]),t._v(" "),n("p",[t._v("插件默认以 style 的名称对 token 命名。然而很多时候 style 的命名是设计师做的，不能够符合程序中的命名规范:")]),t._v(" "),n("p",[n("img",{attrs:{src:e(360),alt:"中文命名"}})]),t._v(" "),n("p",[t._v("对于这个问题，本插件还支持配置命名来源为 style description。从菜单中选择插件的设置即可:")]),t._v(" "),n("p",[n("img",{attrs:{src:e(328),alt:"naming conig"}})]),t._v(" "),n("p",[t._v("通过figma style配置description字段即可。插件导出的 token 将会取该字段。如果该样式description字段为空，将会以 style id 来命名。")]),t._v(" "),n("p",[n("img",{attrs:{src:e(361),alt:"description"}})]),t._v(" "),n("h3",{attrs:{id:"github-pull-request"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#github-pull-request"}},[t._v("#")]),t._v(" Github Pull Request")]),t._v(" "),n("p",[t._v("将 token 导出为 pull request，可以通过 github actions 等方式实现更高程度的自动化。")]),t._v(" "),n("ol",[n("li",[t._v("需要首先在设置页面配置 github access token。获取方式可以参考 "),n("a",{attrs:{href:"https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token",target:"_blank",rel:"noopener noreferrer"}},[t._v("github 文档"),n("OutboundLink")],1)])]),t._v(" "),n("p",[n("img",{attrs:{src:e(328),alt:"naming conig"}})]),t._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[t._v("在选择样式之后，点击 Make a PR 按钮进入 PR 发起页面。填写对应的 repo 和 version (package.json version 字段)。即可点击确认发起 PR。")])]),t._v(" "),n("p",[n("img",{attrs:{src:e(362),alt:"create pr"}})]),t._v(" "),n("h2",{attrs:{id:"还有问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#还有问题"}},[t._v("#")]),t._v(" 还有问题？")]),t._v(" "),n("ul",[n("li",[t._v("在 "),n("a",{attrs:{href:"https://github.com/ExcitedSpider/figma-design-token-dock/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v("github issues"),n("OutboundLink")],1),t._v(" 提问")])]),t._v(" "),n("h2",{attrs:{id:"开发"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#开发"}},[t._v("#")]),t._v(" 开发")]),t._v(" "),n("ol",[n("li",[t._v("clone & install")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run start\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("load "),n("code",[t._v("manifest.json")]),t._v(" in figma desktop")])])])}),[],!1,null,null,null);s.default=a.exports}}]);