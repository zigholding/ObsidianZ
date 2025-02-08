---
PrevNote: "[[LLM - 问问笔记]]"
NextNote: "[[pyttsx3]]"
words:
  2025-02-06: 368
  2025-02-08: 730
---
、
# 从 Gitee 下载 Obsidian 示例库文件：一键获取索引笔记与脚本

在 Obsidian 的使用过程中，我们常常需要从示例库中下载一些索引笔记、脚本笔记或 JS 代码文件。为了方便大家快速获取这些资源，我编写了一个脚本，能够直接从 [[Gitee]] 下载所需的文件。本文将详细介绍如何使用这个脚本，并附上完整的代码。

这个脚本的主要功能是从 [[ObsidianZ]] 示例库中下载文件或文件夹。执行脚本后，会弹出一个对话框，让你选择要下载的文件或文件夹。如果选择的是文件夹，脚本会进一步弹出子文件选择窗口，直到你选择具体的文件为止。

![[Pasted image 20250208223856.png]]


以下是完整的脚本代码，你可以直接复制到 Obsidian 中使用。

```js //templater
let repoOwner = 'zigholding';
let repoName = 'ObsidianZ';
let path = '__plugins__'; 
let branch = 'master';

async function list_files_of_path(repoOwner, repoName, path, branch = 'master') {
	// path是目录是返回文件列表
	// path是文件是返回指定文件
	// path是存在时返回空
    let url = `https://gitee.com/api/v5/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`;
	let req = await requestUrl(url)
	req = JSON.parse(req.text)
	if(!Array.isArray(req)){
		req = [req]
	}
	return req
}

async function download_file(url){
	// url='https://gitee.com/api/v5/repos/zigholding/ObsidianZ/contents/__plugins__/_customJS_/DeepSeek.js'
	// 实际也可以直接下载：https://gitee.com/zigholding/ObsidianZ/raw/master/__plugins__/_customJS_/DeepSeek.js
	let req = await requestUrl(url)
	req = JSON.parse(req.text)
	let ctx = atob(req.content)
	console.log(req.path)
	console.log(ctx)
	let folder_path = req.path.slice(0,req.path.length-req.name.length-1)
	let folder = app.vault.getFolderByPath(folder_path)
	if(!folder){
		folder = await app.vault.createFolder(folder_path)
	}
	let tfile_path = `${folder_path}/${req.name}`
	let tfile = app.vault.getFileByPath(tfile_path)
	if(!tfile){
		tfile = await app.vault.create(tfile_path,ctx)
		new Notice(`下载：${tfile.path}`,5000)
	}else{
		await app.vault.modify(tfile,ctx)
		new Notice(`更新：${tfile.path}`,5000)
	}
}

async function download_file_of_dir(repoOwner, repoName, path, branch){
	let items = await list_files_of_path(repoOwner, repoName, path, branch)
	nc=app.plugins.getPlugin('note-chain');
	let item = await nc.dialog_suggest(items.map(x=>x.path),items,'',false)
	if(!item){return}
	if(item.type=='file'){
		let url = item._links.self
		download_file(url)
	}else if(item.type=='dir'){
		download_file_of_dir(repoOwner, repoName, item.path, branch)
	}
}

download_file_of_dir(repoOwner, repoName, path, branch)
```

使用步骤：
1. **复制代码**：将上述代码复制到 Obsidian 的笔记中；
2. **运行脚本**：在 Obsidian 中运行该脚本；
3. **选择文件**：在弹出的对话框中选择你要下载的文件或文件夹。
4. **下载完成**：文件将自动下载到你的本地 Obsidian 库中。

注意事项：
- 如果你选择的是文件夹，脚本会递归地列出文件夹中的所有文件，直到你选择具体的文件为止。
- 如果文件已经存在，脚本会提示你文件已更新。


通过这个脚本，你可以轻松地从 [[Gitee]] 下载 [[ObsidianZ]] 示例库中的文件，极大地提高了工作效率。希望这个脚本能帮助你更好地使用 Obsidian，享受知识管理的乐趣！

