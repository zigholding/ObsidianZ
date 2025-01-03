---
words:
  2024-11-27: 126
  2024-11-28: 154
  2024-11-30: 156
  2024-12-05: 154
NextNote: "[[示例：通过 ModalOpener 编辑笔记块]]"
PrevNote: "[[示例：如何使用示例库]]"
status: 🌴
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


由于标题都是“临时输入”，显示没什么用，可以通过 css 隐藏。

```css
.modal-opener-content .inline-title {
    display: none;
}
```


