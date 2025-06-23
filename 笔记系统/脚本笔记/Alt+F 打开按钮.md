---
PrevNote: "[[插入 WebViewer 链接]]"
words:
  2025-06-09: 30
NextNote: "[[手机弹窜按钮]]"
hotkey: Alt+F
notechain:
  level: ""
tags:
  - Publish/ObsidianZ
emoji: 📣
---


```js //templater
if(app.isMobile){
	nc.chain.open_note_in_modal('手机弹窜按钮')
}else{
	nc.chain.open_note_in_modal('电脑弹窗按钮')
}
```

