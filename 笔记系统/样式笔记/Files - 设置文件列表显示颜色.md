---
PrevNote: "[[设置编辑器颜色]]"
tags:
  - Publish/ObsidianZ
  - 脚本笔记
words:
  2025-05-27: 1211
NextNote: "[[Files - 设置文件列表显示文本]]"
emoji: 📣
---


你有没有想过，自己的 Obsidian 笔记，不止能写，还能“穿衣打扮”？  
就像换微信聊天背景、QQ 主题一样——我们每天盯着的笔记页面，其实也可以根据心情换换颜色、来点仪式感！

今天我们就来搞点花活，教你用一段小小的脚本，给 Obsidian 笔记“换个风格”，而且超级简单，不用会代码也能玩转。

### 一、先来点背景——我们为什么要给笔记“换皮肤”？

想象一下，你打开 Obsidian，看到的笔记是冷冷清清的一片白，或者沉沉的深色背景，每天都一样，是不是感觉有点无聊？

有些人喜欢在写不同类型的内容时，搭配不同颜色的背景。比如：

- 写生活日记用淡粉色，像春天的樱花。
    
- 写工作笔记配浅蓝色，清爽高效。
    
- 写灵感创意就来点浅紫，浪漫神秘。
    

不仅美观，还能让不同类型的笔记，一眼分清，视觉上就有“分区”的效果。  
而今天这个小工具，就能帮你轻松搞定！


### 二、核心来了：这段脚本，帮你一键换色！

你只需要设置一个叫 `notechain.style` 的字段，它就能调用你预设好的颜色列表，弹出一个选择菜单，让你点一下就换背景！

```js //templater
let styles = `
浅灰色: '#f0f0f0'
浅黄色: '#ffffe0'
米色: '#f5f5dc'
浅紫: '#e6e6fa'
浅绿色: '#90ee90'
浅蓝色: '#add8e6'
淡粉红: '#ffb6c1'
樱花粉色: '#FFE0F5'
无背景色: 'None'
深蓝: '#1a1a2e'
深灰: '#121212'
深紫: '#2d142c'
墨绿: '#0d2818'
深红棕: '#2b0b0b'
`;

let nc = app.plugins.getPlugin('note-chain');
styles = ea.editor.yamljs.load(styles);
let style = await ea.dialog_suggest(Object.keys(styles),Object.values(styles));
if(!style){return}
nc.editor.set_frontmatter(
	ea.cfile,
	ea.nc.settings.field_of_background_color,
	style
)
```

看起来可能像“黑魔法”，其实就是这么几步：

#### ✅ 第一步：准备好你喜欢的颜色

脚本里预设了好几种颜色：

![[Pasted image 20250527212331 1.png]]

如果你不知道怎么怎么搭配，可以直接问元宝：

>我有个按钮，是白色填充黑色字符，我想更改其的背景色，同时让黑色文本可以正常显示．有哪些颜色可以推荐，使用#ffffff格式返回。


#### ✅ 第二步：用插件 note-chain + templater

这个脚本要依赖两个插件：

- `note-chain`：笔记链插件，用来设置背景字段。
- `Templater`：模板插件，让脚本跑起来。

只要你已经安装好这两个插件，复制这段脚本贴到你的模板里，就可以用了。

#### ✅ 第三步：点一下，颜色就换好了！

脚本会弹出一个颜色选择菜单，你选一个，Obsidian 就会自动把对应的颜色值写进 YAML 的 `notechain.style` 字段里。

前提是你的 CSS 主题支持这个字段（不过现在很多主题和插件都已经兼容了），一旦写进去了，笔记的背景色就变了！是不是很爽？

![[设置颜色 1.gif]]


### 三、一句话总结：用颜色，让笔记也有情绪！

谁说做笔记一定要一板一眼？  
我们可以用一点点脚本小魔法，让笔记不止好用，还能“好看”。

而且说实话，光是能每天换个颜色，就足够提升打开 Obsidian 的幸福感了。


### 最后，来聊聊——你想给笔记配什么颜色？

你是喜欢清新风格的淡色派，还是沉稳大气的深色控？  

你会不会也给不同类型的内容配上不同的颜色？

欢迎在评论区分享你的配色搭配灵感，或者你觉得笔记还有哪些“可视化魔法”值得一试？

说不定你的灵感，下次就是我们分享的主题！


<html>
<body>
<div>
<!-- 浅色系按钮（黑字） -->
<button style="background-color: #f0f0f0; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">浅灰色</button>
<button style="background-color: #ffffe0; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">浅黄色</button>
<button style="background-color: #f5f5dc; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">米色</button>
<button style="background-color: #e6e6fa; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">浅紫</button>
<button style="background-color: #90ee90; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">浅绿色</button>
<button style="background-color: #add8e6; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">浅蓝色</button>
<button style="background-color: #ffb6c1; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">淡粉红</button>
<button style="background-color: #FFE0F5; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #dcdcdc">樱花粉</button>

<button style="background-color: #1a1a2e; color: #ffffff; padding: 10px 20px; margin:5px; border:1px solid #404040">深蓝</button>
<button style="background-color: #121212; color: #ffffff; padding: 10px 20px; margin:5px; border:1px solid #404040">深灰</button>
<button style="background-color: #2d142c; color: #ffffff; padding: 10px 20px; margin:5px; border:1px solid #404040">深紫</button>
<button style="background-color: #0d2818; color: #ffffff; padding: 10px 20px; margin:5px; border:1px solid #404040">墨绿</button>
<button style="background-color: #2b0b0b; color: #ffffff; padding: 10px 20px; margin:5px; border:1px solid #404040">深红棕</button>

<button style="background-color: transparent; color: #000000; padding: 10px 20px; margin:5px; border:1px solid #666666">无背景色</button>
</div>
</body>
</html>



