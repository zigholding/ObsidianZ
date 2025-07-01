---
PrevNote: "[[Textarea 记录完成事项]]"
NextNote: "[[执行当前脚本笔记]]"
notechain:
  level: "\t"
words:
  2025-05-22: 480
  2025-06-27: 481
tags:
  - Publish/ObsidianZ
  - 脚本笔记
emoji: 📣
---


1.  获取当前笔记的别名，包括在 `aliases` 中显示添加的别名，和入链笔记中引用的别名；
2. 如果当前笔记不存在别名，输入别名，添加到 `aliases` 元数据中；
3. 如果当前笔记存在别名，在选择列表中选择原始别名 `src`，输入新别名 `dst`；
	1. 如果 `src` 在不在当前别名中，添加别名 `dst`
	2. 如果 `src` 存在，修改所有别名和入链笔记中的引用为 `dst`
4. 如果添加的别名和文件名相同，删除别名；


```js //templater
let nc = app.plugins.getPlugin('note-chain')
function get_aliases(tfile,with_link=true){
	let aliases = nc.editor.get_frontmatter(tfile,'aliases');
	
	if(!aliases){aliases = []}
	aliases = aliases.map(x=>x);
	
	if(!with_link){return aliases}
	
	let inlinks = nc.chain.get_inlinks(tfile);
	for(let link of inlinks){
		let meta = app.metadataCache.getFileCache(link);
		if(meta.links){
			for(let c of meta.links){
				if(c.link==tfile.basename && !aliases.contains(c.displayText)){
					aliases.push(c.displayText)
				}
			}
		}
	}
	return aliases;
}

async function rename_alias(tfile,src,dst){
	if(src==dst && dst!=tfile.basename){return}
	let inlinks = nc.chain.get_inlinks(tfile);
	for(let link of inlinks){
		let meta = app.metadataCache.getFileCache(link);
		if(meta.links){
			for(let c of meta.links){
				if(c.displayText==src){
					let src_text = `[[${tfile.basename}|${src}]]`
					let dst_text = `[[${tfile.basename}|${dst}]]`
					if(dst==tfile.basename){
						dst_text = `[[${tfile.basename}]]`
					}
					let escapedSrc = src_text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
					let regex = new RegExp(escapedSrc, 'g');
					await nc.editor.replace(tfile,regex,dst_text);
					break;
				}
			}
		}
	}

	let aliases = nc.editor.get_frontmatter(tfile,'aliases');
	if(!aliases){aliases=[]}
	if(aliases.contains(src)){
		aliases = aliases.filter(x=>x!=src)
	}
	if(!aliases.contains(dst)){
		aliases.push(dst)
	}
	aliases = aliases.filter(x=>x!=tfile.basename);
	await this.app.fileManager.processFrontMatter(tfile, (fm) =>{
		if(aliases.length==0){
			delete fm['aliases']
		}else{
			fm['aliases'] = aliases
		}
	});
}

async function add_alias(tfile,dst){
	if(!dst || dst==tfile.basename){return}
	let aliases = nc.editor.get_frontmatter(tfile,'aliases');
	if(!aliases){aliases=[]}
	if(aliases.contains(dst)){return}
	aliases.push(dst)
	console.log(aliases)
	await this.app.fileManager.processFrontMatter(tfile, (fm) =>{
		fm['aliases'] = aliases
	});
}

let tfile = easyapi.cfile;

let aliases = get_aliases(tfile);
if(aliases.length==0){
	let dst = await easyapi.dialog_prompt('添加别名');
	await add_alias(tfile,dst)
}else{
	let src = await easyapi.dialog_suggest(aliases,aliases,'',true);
	if(!src){return}
	
	let dst = await easyapi.dialog_prompt('新别名','',src);
	if(!dst){return}
	if(aliases.contains(src)){
		await rename_alias(tfile,src,dst);
	}else{
		await add_alias(tfile,dst)
	}
}
```

