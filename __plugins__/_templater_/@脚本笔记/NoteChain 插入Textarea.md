---
PrevNote: "[[渲染代码]]"
NextNote: "[[Files - 附件分类存放]]"
words:
  2025-02-07: 692
---


```
~~~textarea
textarea:
  cls: textarea_v2
  style:
    height: 100px
	backgroundImage:  Pasted image 20250207201413.png
	backgroundSize: "cover"
buttons:
  - [清空,clear_area,mod-warning]
  - [复制,copy_area]
  - [测试Textarea,NoteChain 插入Textarea,mod-cta]
~~~
```

```textarea
textarea: 
  cls: textarea_v2
  style:
    height: 100px
    backgroundImage: Pasted image 20250207201413.png
    backgroundSize: "cover"
buttons:
  - [瞬时笔记,customJS.Textarea.insert_fleeting]
  - [清空,clear_area,mod-warning]
  - [复制,copy_area]
  - [测试Textarea,NoteChain 插入Textarea,mod-cta]
```



### 设置文本框

`textarea` 默认生成一个 `width=100%, height=200px` 的文本框。可以通过 `cls` 和 `style` 一起设置风格，兼容泛化和个性。

`cls` 通过修改 `css` 文本设置，`style` 可以通过打印 `area.style` 查看支持的类别（见下一章节）。

为了方便设置文本框背景图，可以直接定义 `backgroundImage`，支持本地图片！

```yaml
textarea:
  style:
	backgroundImage:  Pasted image 20250207201413.png
```

![[Pasted image 20250207202846.png]]


代码块的初衷是方便在日记中输入笔记，但也可以只保留按钮。在配置项中，将 `textarea` 设置为 `false`：

```yaml
textarea: false
```

如下图所示，最后只有三个按钮，可以用来快速执行某些任务。

![[Pasted image 20250207195341.png]]

### 设置按钮函数

每个按钮由一个数据声明，分别是名称、函数名、样式。

名称即按钮显示的文本，样式是按钮的风格，默认  `code_block_textarea_btn`，可以定义不同的风格，通过 `css` 显示不同的样式。例如，设置为 `mod-cta` 显示为蓝底白字，`mod-warning` 显示为红底白字，这样都是 Obsidian 自带的样式，可以直接使用。

![[Pasted image 20250207200115.png]]

下面重点介绍函数！

首先，提供了三个内置函数：
1. `copy_area`：复制文本框
2. `clear_area`：清空文本框
3. `log_area`：在控制台打印文本框元素，查看其字段设置不同风格；

按钮还支持自定义函数：
- `customJS`：例如 `Textarea.js` 的类 `Textarea` 定义了 `insert_fleeting` 函数，通过 `customJS.Textarea.insert_fleeting` 访问；
-  `templater`：如果 `templater` 定义了用户函数，也可以输入函数名调用；
- 函数接收的参数：`(area,source,el,ctx)`。`area` 即文本框元素，代码块文本，代码块元素和代码块所在 `Markdonw` 的上下文信息；

更让人兴奋的是，按钮还支持脚本笔记！如果参数是笔记名的话，会提取该笔记的 `js //templater` 代码块执行。可以脚本笔记中，通过 `tp.config.extra` 获取文本框对象：

```js
tp.config.extr:{area:area,source:source,el:el,ctx:ctx}
```

例如，[[NoteChain 插入Textarea]] 中定义了如下的脚本，可以打印传参。

```js //templater
// NoteChain 插入Textarea.md
console.log(tp.config.extra)
console.log(tp.config.extra.area.style)
```

这样，可以在通过自定义函数或脚本笔记完成各种复制功能，比如将文本框中的文本发送到日志任务或瞬时笔记中。