---
PrevNote: "[[exec_current_note]]"
notechain:
  in_a_word: 重启插件
words:
  2024-12-14: 205
params:
  pid: plugin_id
---

开发插件时，经常需要重启插件测试功能。

可以通过 `app.plugins` 重启插件，比设置页面重启效率高很多。

使用方式：
1. 执行本脚本笔记，从 `suggester` 选择插件 ID 重启；
2. 设置 `params.pid` 为需要重启的插件ID，可以重启指定插件；
3. 嵌入到其它脚本笔记，测试功能；

> `nc.utils.parse_templater(app,'reload_plugin.md')`


```js //templater
async function reload_plugin(pluginId) {
    const plugin = app.plugins.plugins[pluginId];
    if (plugin) {
        await app.plugins.unloadPlugin(pluginId)
        await app.plugins.loadPlugin(pluginId)
    } else {
        await app.plugins.loadPlugin(pluginId)
    }
}

let nc = app.plugins.getPlugin('note-chain')
let tfile = nc.chain.get_tfile('reload_plugin')
let pid = nc.editor.get_frontmatter(tfile,'params.pid')
let keys = Object.keys(app.plugins.plugins)
if(!pid|| !keys.contains(pid)){
	
	pid = await nc.chain.tp_suggester(
		keys.map(key=>{
			let p = app.plugins.getPlugin(key)
			return p.manifest.name//+'\n'+p.manifest.description
		}),
		keys,true,'Select plugins to restart'
	)
}
if(pid){
	reload_plugin(pid)
}
```

