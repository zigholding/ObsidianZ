---
PrevNote: "[[使用软链接将示例库添加到目标库]]"
words:
  2025-01-16: 936
  2025-01-17: 920
NextNote: "[[LLM - 笔记总结]]"
---

在笔记大陆，门派林立，各展其能。近年来，剑士一派异军突起，其中不乏天才绝艳之辈。他们将 AI 大模型炼化为傀儡，以之御剑，威力无匹。世人皆称他们为“傀剑师”。一时间求道者络绎不绝，只为一睹傀剑术风采。


目录内文件排序时，需要自己分析笔记内容。有时偷懒，一些目录中的文件数量噌噌往上涨。等到想改时，一看这么多文件，又懒得动了。

像这种事，最好能交给大模型搞定。

之前开发 NoteChain 时，依赖 Templater 的对话框，搞得我后续开发插件时，总想着从已有的插件中找接口。比如接入大模型时，翻遍 Text Generator 和 Copilot 也没找到哪个接口，可以输入提示词返回结果。

可这玩意儿自己写不是分分钟就搞定吗？只能说买卖思想害人呐。

文末的脚本笔记就是使用 DeepSeek API，返回当前目录下笔记的排序结果。

例如在某目录中，提示词为：

```txt
我希望按文件的相关性的重要性对文件进行排序。因此我将输入我的文件名，请返回两部分内容。1）排序后的文件名：你认为恰当的排序，仅返回排序后的文件名，文件名以换行分割，不用解释你为什么这么排序；2）排序逻辑：在第1分部之后，用简单的一段话来解释你排序逻辑。
以下是我的文件名，每一行一个文件:
@脚本笔记
move_next_level
move_none_level
move_prev_level
执行当前脚本笔记
重启插件
Files - 附件分类存放
Deepseek 自动排序
```

返回结果：

```
1) 排序后的文件名：
执行当前脚本笔记
move_prev_level
move_next_level
move_none_level
重启插件
@脚本笔记
Deepseek 自动排序
Files - 附件分类存放

2) 排序逻辑：
首先，按照文件名的功能性和操作顺序进行排序。"执行当前脚本笔记"被放在最前面，因为它可能是启动或执行脚本的核心操作。接着是"move_prev_level"、"move_next_level"和"move_none_level"，这些文件名可能涉及到脚本中的导航或移动操作，按照逻辑顺序排列。然后是"重启插件"，这可能是在脚本执行过程中需要进行的操作。最后是"@脚本笔记"、"Deepseek 自动排序"和"Files - 附件分类存放"，这些可能是辅助性的文件或功能，因此放在最后。
```

查看它给的结果，“执行当前脚本笔记”放到最前有一定道理，能把 move 系列放一起还算是聪明的。

```js //templater
function prompt_file_sorted(tfile){
	let nc=app.plugins.plugins['note-chain']
	let files = nc.chain.get_brothers(tfile)
	files = nc.chain.sort_tfiles_by_chain(files)
	files = files.map(x=>x.basename)
	let prompt = `我希望按文件的相关性的重要性对文件进行排序。因此我将输入我的文件名，请返回两部分内容。1）排序后的文件名：你认为恰当的排序，仅返回排序后的文件名，文件名以换行分割，不用解释你为什么这么排序；2）排序逻辑：在第1分部之后，用简单的一段话来解释你排序逻辑。\n以下是我的文件名，每一行一个文件:\n${files.join('\n')}`
	return prompt
}
let prompt = prompt_file_sorted(app.workspace.getActiveFile())
let rsp = await customJS.DeepSeek.request_deepseek(prompt)
let rfiles = rsp.content.split('\n').map(x=>x.trim()).join('\n')

let ctx1 = await customJS.ModalOpener.prompt_by_modal_opener(rfiles)
```

