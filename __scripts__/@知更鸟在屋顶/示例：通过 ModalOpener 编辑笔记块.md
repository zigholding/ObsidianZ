---
PrevNote: "[[示例：通过 ModalOpener 实现富文本输入框]]"
words:
  2024-11-30: 210
---


当笔记中有 callout 块时，如果涉及到代码块，编辑起来很不方便。

![[Pasted image 20241130222019.png]]
提取鼠标所在的笔记块，将它在 ModalOpener 中编辑，如果是 callout 块，则替换行首的 `>` 进行编辑，编辑完成后再每行添加 `>` 。这样可以原汁源味地保留格式，很轻松编辑 `callout`。



> [!NOTE]+ 在ModalOpener 中编辑代码
> 
> 
> 在编辑过程中保留原始格式，而且专注于当前代码块。
> 
> ```js
> const {ModalOpener} = await cJS()
> let ctx = await ModalOpener.editor_current_section()
> ```
> 
> 

鼠标放在 callout 上方空白段落，执行 [[示例：通过 ModalOpener 编辑笔记块]]。

![[Pasted image 20241130222357.png]]

在编辑过程中保留原始格式，而且专注于当前代码块。
![[Pasted image 20241130222531.png]]
编辑后，替换原始的 callout。

![[Pasted image 20241130222610.png]]


```js //templater
const {ModalOpener} = await cJS()
let ctx = await ModalOpener.editor_current_section()
```

