---
PrevNote: "[[插入命令ID]]"
NextNote: "[[Alt+F 打开按钮]]"
words:
  2025-06-06: 140
  2025-06-23: 152
  2025-06-21: 140
notechain:
  level: ""
tags:
  - Publish/ObsidianZ
  - 脚本笔记
emoji: 📣
---

[[WebViewer]] 已经深入骨髓了，平常使用时遇到好的文章需要添加链接。但手动复制链接，输入标题很麻烦。针对不同场景实现：

### 复制链接插入笔记中

```js //templater
let wv = app.workspace.getLeavesOfType("webviewer").sort((b,a)=>a.activeTime-b.activeTime)[0];
let md = app.workspace.getLeavesOfType("markdown").sort((b,a)=>a.activeTime-b.activeTime)[0];
if(wv && md){
	let url = `[${wv.view.title}](${wv.view.webview.src}) `;
	await md.view.editor.replaceSelection(url);
}
```

### 复制链接到剪切板


```js /templater
let wv = app.workspace.getLeavesOfType("webviewer").sort((b,a)=>a.activeTime-b.activeTime)[0];
if(wv){
	let url = `[${wv.view.title}](${wv.view.webview.src}) `;
	await navigator.clipboard.writeText(url);
	new Notice('已复制');
}else{
	new Notice('无网站');
}
```


