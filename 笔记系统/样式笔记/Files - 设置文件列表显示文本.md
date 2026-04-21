---
PrevNote: "[[Files - 设置文件列表显示颜色]]"
NextNote: "[[Files - 添加前缀图标]]"
tags:
  - Publish/ObsidianZ
  - 脚本笔记
words:
  2025-06-11: 42
  2025-07-02: 43
  2026-03-05: 44
emoji: 📣
---



```js //templater
let styles = `
emoji: '<emoji> <$0>'
`;

styles = ea.editor.yamljs.load(styles);
let style = await easyapi.dialog_suggest(
	Object.keys(styles),
	Object.values(styles),
	'',true
);
if(!style){return}
ea.nc.editor.set_frontmatter(
	easyapi.cfile,
	ea.nc.settings.field_of_display_text,
	style
)
```

