---
words:
  2024-11-27: 126
---



执行 `Note Chain: Execute Templater modal`，选择[[示例：通过 ModalOpener 实现富文本输入框]]。

![[Pasted image 20241127203103.png]]

在弹窗中输入要添加的内容，点击确定后会在当前鼠标光标处插入编辑的内容。

这是编辑框内输入的，支持图片，使用的是[[示例：通过 ModalOpener 实现富文本输入框]]。

![[Pasted image 20241127203717.png]]


```js //templater
const {ModalOpener} = await cJS()

console.log(ModalOpener)
let ctx1 = await ModalOpener.prompt_by_modal_opener(
	app,
	'临时输入.md', //文本名
	'' // 预输入内容
)
tR+=ctx1
```

