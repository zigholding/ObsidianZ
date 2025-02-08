---
PrevNote: "[[LLM - 自动排序]]"
words:
  2025-01-16: 575
NextNote: "[[LLM - 问问笔记]]"
---


### 如何用AI快速总结笔记？一个简单的代码示例帮你搞定！

在日常学习和工作中，我们经常会遇到需要快速总结大量笔记的情况。无论是为了复习、分享还是整理思路，一个简洁的总结都能大大提高效率。今天，我将分享一个利用AI技术自动总结笔记的小技巧，只需几行代码，就能轻松搞定！

下面的脚本笔记，使用了`note-chain`插件和`DeepSeek` API来实现笔记的自动总结功能。

```js //templater
async function get_prompt(tfile){
	let nc = app.plugins.plugins['note-chain']
	// let ctx = app.vault.cachedRead(tfile);
	let ctx = await nc.editor.remove_metadata(tfile)
	let prompt = `
请用一句不超过50字的文本总结以下笔记内容，重点突出主题、主要观点和结论。
笔记名：${tfile.basename}
笔记正文：${ctx}
`.trim()
	return prompt
}

let tfile = app.workspace.getActiveFile()
let prompt = await get_prompt(tfile)
let rsp = await customJS.DeepSeek.request_deepseek(prompt)
console.log(rsp.content)
```


#### 代码解析

1. **获取笔记内容**：首先，我们通过`app.workspace.getActiveFile()`获取当前活动的笔记文件。然后，使用`note-chain`插件去除笔记中的元数据，只保留纯文本内容。

2. **生成提示词**：接下来，我们生成一个提示词（prompt），要求AI用不超过50字的文本总结笔记内容，重点突出主题、主要观点和结论。

3. **调用AI API**：最后，我们调用`DeepSeek` API，将生成的提示词发送给AI模型，获取总结结果。

4. **输出结果**：总结结果会通过`console.log`输出，方便我们查看和使用。

#### 使用场景

- **复习笔记**：在考试前，快速回顾大量笔记内容，抓住重点。
- **分享知识**：将复杂的笔记内容简化为几句话，方便与他人分享。
- **整理思路**：在写作或项目规划时，快速梳理笔记中的关键信息。

#### 结语

通过这个简单的代码示例，我们可以看到AI技术在笔记管理中的强大潜力。只需几行代码，就能实现笔记的自动总结，大大提高了我们的工作效率。如果你也有类似的需求，不妨试试这个方法，或许会有意想不到的收获！