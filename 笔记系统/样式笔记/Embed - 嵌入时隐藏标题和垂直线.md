---
PrevNote: "[[mobile - 隐藏页面标题]]"
NextNote: "[[隐藏 ModalOpen 标题]]"
words:
  2025-06-17: 359
tags:
  - Publish/ObsidianZ
emoji: 📣
---


使用嵌入功能时，那斗大的标题，垂直的紫色线条，无不在提醒着我：下面这段笔记来自其它笔记，你要不要点开看看。

对于种子笔记、幼芽笔记或树苗笔记，由于笔记尚不完善，修改迭代更为重要。因此通过不同的风格来显示嵌入笔记，倒也贴心。

但对于常青笔记或永久笔记，它基本定型，此时更注重阅读，我更希望它能够流畅地从头看到尾。那突兀的标题、显现的紫色线索，无不打断我的注意力。

所以，如何隐藏标题和垂直线呢？这些可以通过 css 快速实现。

### 是否显示标题

选项控制是否显示标题：
- `![[xxx|no-title]]`：不显示文件名
- `![[xxx|no-head]]`：不显示一级标题
- `![[xxx|no-h3]]`：不显示三级标题

```css
.internal-embed[alt*="no-title"] .markdown-embed-title {  
	display: none;  
}  
  
.internal-embed[alt*="no-h1"] h1[data-heading] {  
	display: none;  
}  
  
.internal-embed[alt*="no-h2"] h2[data-heading] {  
	display: none;  
}  
  
.internal-embed[alt*="no-h3"] h3[data-heading] {  
	display: none;  
}  
  
.internal-embed[alt*="no-h4"] h4[data-heading] {  
	display: none;  
}  
  
.internal-embed[alt*="no-head"] h1[data-heading],  
.internal-embed[alt*="no-head"] h2[data-heading],  
.internal-embed[alt*="no-head"] h3[data-heading],  
.internal-embed[alt*="no-head"] h4[data-heading] {  
	display: none;  
}
```

### 是否显示垂直线

嵌入时不显示标题 不同，

与隐藏标题不同，紫色垂直线在 css 中是全局设置的，不能通过 `[[abc|no-line]]` 隐藏线索，但可以通过元属性设置 css 类别。

```yaml
cssClasses:  
- embed_noline
```

```css
.embed_noline .markdown-embed {  
	border-left-width: 0px;  
	padding-left: 0px;  
}
```

