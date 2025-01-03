---
PrevNote: "[[重启插件]]"
NextNote: "[[YAML - 将潜在链接变为现实]]"
params:
  folders:
    - attachmentFolderPath
words:
  2024-10-26: 169
  2024-11-22: 324
  2024-12-15: 426
  2024-12-16: 429
  2024-12-17: 821
notechain:
  level: ""
---


这个脚本的功能是移动和整理附件文件，根据其文件扩展名将文件移动到特定的子文件夹中。

主要分为以下几个步骤：

1. **获取目标文件夹 (`get_target_folders`)**：
    
    - 通过插件`note-chain`获取名为`Files - 附件分类存放`的文件，并读取其中的`params.folders`字段（该字段指定了附件的存放目录）。
    - 如果没有指定`folders`，默认使用Obsidian配置中的附件文件夹路径（`attachmentFolderPath`）。
    - 如果文件夹路径是`attachmentFolderPath`字符串，则替换为Obsidian的实际路径。
    - 返回最终的目标文件夹列表。
2. **获取子目录路径 (`subdir`)**：
    
    - 这个函数根据文件名或创建时间来决定附件的子文件夹路径。
    - 如果文件名匹配“Pasted image YYYYMMDDHHMMSS.png”的格式，提取日期部分并按年月格式组织到`images/YYYYMM`文件夹。
    - 如果不符合该格式，则使用文件的创建时间来生成子文件夹路径。
3. **扩展名与文件夹映射 (`exts`)**：
    
    - 脚本定义了一个扩展名与目标文件夹的映射关系。例如，`.pdf`文件将被移动到`pdf`文件夹，`.pptx`文件将被移动到`ppt`文件夹。
    - 对于图像文件（如`.png`、`.jpg`等），使用`subdir`函数根据文件名或创建时间生成适当的子目录。
4. **移动附件文件 (`move_attachments`)**：
    
    - 该函数接受一个文件夹对象作为输入，过滤出所有符合条件的附件文件（扩展名不是`md`、文件名不以`~`开头，且扩展名在`exts`映射中）。
    - 对于每个符合条件的文件，首先计算目标目录（根据扩展名或`subdir`函数）。如果目标目录不存在，则创建它。
    - 然后，将文件移动到目标目录。如果目标路径已经存在文件，则输出提示。
5. **执行文件移动**：
    
    - 脚本首先调用`get_target_folders`函数获取目标文件夹列表。
    - 对于每个文件夹，调用`move_attachments`函数执行附件文件的整理和移动操作。



```js //templater
// 要整理的目录
function get_target_folders(){
	let nc = app.plugins.getPlugin('note-chain')
	let tfile = nc.chain.get_tfile('Files - 附件分类存放')
	let folders = nc.editor.get_frontmatter(tfile,'params.folders')
	if(!folders){
		folders = [
			app.vault.config.attachmentFolderPath
		]
	}
	folders = folders.map(x=>{
		if(x=='attachmentFolderPath'){
			return app.vault.config.attachmentFolderPath
		}else{
			return x
		}
	}).map(x=>app.vault.getFolderByPath(x)).filter(x=>x)
	return folders
}

function subdir(tfile){
	if(tfile.name.match(/Pasted image \d{14}.png/)){
		let s = tfile.name.replace(/Pasted image (\d{14}).png/,'$1')
		return 'images/'+new moment(s,'YYYYMMDDHHmmSS').format('YYYYMM');
	}else{
		let t1 = new Date(tfile.stat.ctime);
		let t2 = new moment(t1);
		return 'images/'+t2.format('YYYYMM')
	}	
}

let exts = {
	'pdf':'pdf',
	'ppt':'ppt',
	'pptx':'ppt',
	'doc':'doc',
	'docx':'doc',
	'mp4':'video',
	'xls':'xls',
	'xlsx':'xlsx',
	'wav':'audio',
	'py':'pyscripts',
	'webp':subdir,
	'png':subdir,
	'jpg':subdir,
	'gif':subdir,
}

async function move_attachments(folder){
	let keys = Object.keys(exts)
	let tfiles = folder.children.filter(
		x=>{
			return x.extension && 
			x.extension!='md' && 
			!x.name.startsWith('~') &&
			keys.contains(x.extension)
		}
	)

	let adir = folder.path
	
	for(let tfile of tfiles){
		let ext = exts[tfile.extension];
		if(!(typeof ext === 'string')){
			ext = ext(tfile);
		}
		let xdir = adir+'/'+ext;
		if(!app.vault.getFolderByPath(xdir)){
			await app.vault.createFolder(xdir);
		}
		let dst = xdir+'/'+tfile.name;
		if(!(tfile.path===dst)){
			if(app.vault.getFileByPath(dst)){
				console.log('Exist:',tfile.path);
			}else{
				new Notice(tfile.path+'-->'+dst,5000);
				console.log(tfile.path+'-->'+dst)
				await app.fileManager.renameFile(tfile,dst);
			}
		}
	}
}

let folders = get_target_folders()
for(let folder of folders){
	await move_attachments(folder)
}
```

