---
PrevNote: "[[样式笔记]]"
NextNote: "[[mobile - 隐藏页面标题]]"
words:
  2025-07-25: 137
  2025-08-11: 630
tags:
  - Publish/ObsidianZ
  - 脚本笔记
emoji: 📣
---



**你有没有遇到过这样的尴尬？**  

辛辛苦苦写了一段 CSS 样式，想让它在 Obsidian 里立刻生效，结果一保存——咦？没反应？一查才知道，还得跑去 snippets 文件夹、手动复制、再改配置、最后重启软件……这一套流程下来，心态差点没崩。

**今天，就教你一个“一键搞定”的小魔法。**  

只要写个小脚本，你就能把当前笔记里的 CSS 自动丢进 snippets 文件夹，还能直接启用它，让样式马上见效，不用手动折腾。

### 操作思路

这个脚本的核心步骤很简单，就三步走：

**1. 从当前笔记里提取 CSS**  
脚本会先在当前笔记里找到 `css` 代码块，把里面的内容收集起来。如果没写内容，那它就安静退出，不打扰你。

**2. 自动保存到 snippets 文件夹**  

它会用当前笔记的文件名作为 CSS 文件名（这样方便记忆），存到 `snippets` 文件夹中，就好像你手动复制粘贴过去了一样。

**3. 更新 Obsidian 配置并立刻生效**  

正常来说，你改完配置文件还得重启才能看到效果。但这个脚本会顺手帮你把 CSS 直接加载进来，让它马上在界面上显示出来——简直就是“热更新”体验。

### 为什么值得用？

- **节省时间**：少了复制、粘贴、找文件、改配置的麻烦。
    
- **不怕忘路径**：脚本帮你自动放到正确位置。
    
- **立即可见效果**：改完马上生效，调样式像调灯光一样丝滑。
    

以后你想试样式，只要在笔记里写好 CSS，运行这个脚本就行，省时省力又优雅。


**小结**  

写 CSS 不怕麻烦，调样式才是乐趣。但我们要把时间花在创作上，而不是无意义的搬运上。用这段脚本，就能让 CSS 从“动手搬”变成“一键送”，效率直接起飞。



```js //templater
// 读取 css
let css = await ea.editor.extract_code_block(ea.cfile,'css');
css = css.join('\n\n\n').trim();
if(css==''){return}

// 将 css 写入 snippets
let cpath = app.vault.configDir+'/'+'snippets'+'/'+ea.cfile.basename+'.css';
await app.vault.adapter.write(cpath,css);

// 在配置文件中添加 css
// 注意，此时 app.vault.config 有该 css，但需要重启生效
let config = await app.vault.readJson(app.vault.configDir+'/'+'appearance.json');
if(!config['enabledCssSnippets'].contains(ea.cfile.basename)){
	config['enabledCssSnippets'].push(ea.cfile.basename);
	await app.vault.writeJson(app.vault.configDir+'/'+'appearance.json',config);
}

// 本次生效
await ea.nc.utils.toogle_note_css(app,document,ea.cfile.basename,false)
```


