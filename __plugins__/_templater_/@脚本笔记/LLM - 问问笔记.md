---
PrevNote: "[[LLM - 笔记总结]]"
words:
  2025-01-16: 97
NextNote: "[[从 gitee 下载示例库文件]]"
---





```js //templater
async function get_prompt(tfile){
	let nc = app.plugins.plugins['note-chain']
	// let ctx = app.vault.cachedRead(tfile);
	let ctx = await nc.editor.remove_metadata(tfile)
	let prompt = await nc.chain.tp_prompt('输入提示词')
	prompt = `
${prompt}
笔记名：${tfile.basename}
笔记正文：
${ctx}
`.trim()
	return prompt
}

let tfile = app.workspace.getActiveFile()
let prompt = await get_prompt(tfile)
console.log(prompt)
let rsp = await customJS.DeepSeek.request_deepseek(prompt)
console.log(rsp.content)
```



帮我将当前笔记改写成一篇公众号文章

