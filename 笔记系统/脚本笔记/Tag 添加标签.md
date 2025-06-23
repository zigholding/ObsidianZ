---
PrevNote: "[[Editor - 复制段落]]"
NextNote: "[[Editor 复制网页代码]]"
words:
  2025-05-05: 113
  2025-06-01: 801
  2025-06-16: 811
  2025-06-23: 801
tags:
  - Publish/ObsidianZ
  - 脚本笔记
  - 笔记森林/🌲常青
  - 脚本笔记
emoji: 📣
---

你有没有过这种感受：

> 打开 Obsidian 想整理一下笔记，一眼望去，全是“Untitled”、“杂项”、“灵感笔记01”……就像参加了一个没有名字贴的同学会，谁是谁，完全对不上号。

更别提标签系统了，有时候手动输错一个字母，结果一个“Project”和一个“Projeckt”，居然被系统当成俩不同人对待，令人崩溃。

这时候你可能在想——有没有一种方法，**像点菜单一样选标签**，点一下就能帮我智能归类、自动去重、完美入座？

我写了一个小脚本，就干这个事！不夸张地说，它是我写过最“人性化”的 Obsidian 插件脚本之一。

[复制粘贴 Obsidian 脚本笔记代码](https://mp.weixin.qq.com/s/hn5tGVlzYAMJ7OXySNH3gQ)，执行脚本笔记：

```js //templater
let nc=app.plugins.getPlugin("note-chain");
let items = [
	"Project/⭐Star",
	"Project/📖Open", 
	"Project/📕Close",
	
	"笔记森林/🎵瞬时",
	"笔记森林/🌰种子", 
	"笔记森林/🌱幼苗", 
	"笔记森林/🌴树苗", 
	"笔记森林/🌲常青", 
	"笔记森林/🎼永久", 
	
	'脚本笔记',
	'索引笔记',
	'启动脚本',

	'Publish/ObsidianZ'
];

let target =  await tp.system.suggester(
	nc.utils.array_prefix_id(items),
	items
);

if(target){
	let tfiles = nc.chain.get_selected_files();
	for(let tfile of tfiles){
		await app.fileManager.processFrontMatter(tfile,fm =>{
			if(fm['tags']==null){
				fm['tags'] = [target];
				return;
			}
			
			if(!(fm['tags'] instanceof Array)){
				fm['tags'] = [fm['tags']];
			}
			
			fm['tags']=fm['tags'].filter(x=>x);
			
			if(fm['tags'].contains(target)){return}
			
			if(target.contains('/')){
				let cc = target.split('/');
				let prefix = cc.slice(0,cc.length-1).join('/')+'/';
				let items = [target];
				for(let item of fm['tags']){
					if(!item.startsWith(prefix)){
						items.push(item)
					}
				}
				fm['tags'] = items;
			}else{
				fm['tags'].push(target);
			}
			
		})
	}
}
```


### 🧩 第一步：预设标签菜单，免去“拼写烦恼”

开头定义了一批常用标签，比如：

- `Project/📖Open`：代表进行中的项目；
- `笔记森林/🌱幼苗`：代表刚开始写的笔记；
- `脚本笔记`、`索引笔记`：功能性分类也安排上。

你只需要从列表里**选择一个**，不用再去绞尽脑汁“我当初是写的Open还是Opening来着”？

### 🎛 第二步：前置检查，防止“撞车”或“重复”

选择完标签后，它会优雅地检查：

- 如果你笔记里**没有标签**，直接加上；
- 如果已经有标签但是字符串格式（比如 `"tag1"`），它会悄悄转成数组格式（`["tag1"]`）；
- 会自动去掉空标签，防止意外垃圾信息；
- 如果你已经加了这个标签？那就不再重复添加，贴心！

### 🧹 第三步：智能清理“同宗标签”

比如你选了 `Project/📕Close`，脚本会把之前 `Project/📖Open` 或 `Project/⭐Star` 这些同一前缀的标签替换掉，避免你一个项目笔记上挂着一堆不一致的状态标签。

也就是说：**同一系列的标签，只留一个！**  

就像你点了“微辣”，它就不会再保留“特辣”或“不辣”了——逻辑清清爽爽，不糊锅。

### ✅ 写了脚本之后，我再也没手动输过标签

整个体验就像——

> 给每篇笔记贴上“智能名牌”，  
> 它不仅知道你想要什么，还懂得怎么把不该出现的标签“请出房间”。

而你，只需要动一动鼠标，选一下。

