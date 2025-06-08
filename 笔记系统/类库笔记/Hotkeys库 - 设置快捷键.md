---
PrevNote: "[[ECharts 绘制热力图日历]]"
NextNote: "[[笔记画廊]]"
words:
  2025-06-06: 261
---

```js //templater
class HotKeys{
    key2string(key){
		if(key instanceof Array){
			return key.map(
				item=>{
					if(item.modifiers.length>0){
						return item.modifiers.join('+')+'+'+item.key
					}else{
						return item.key
					}
				}
			).join('&&')
		}else{
			if(!key){
				return ''
			}else if(typeof(key.modifiers)=='string'){
				if(key.modifiers!=''){
					return key.modifiers.replace(/,/g,'+')+'+'+key.key
				}else{
					return key.key
				}
			}else{
				return key.modifiers.join('+')+'+'+key.key
			}
			
		}
	}

	key4string(skey){
		return skey.split('&&').map(item=>{
			let items = item.split('+')
			let t = {}
			t['modifiers'] = items.slice(0,items.length-1)
			t['key'] = items[items.length-1]
			return t
		})
	}

	defaultKeys(){
		let cmds = Object.keys(app.hotkeyManager.defaultKeys)
		let skey = this.key2string(app.hotkeyManager.defaultKeys[cmds[0]])
		
		let kv = []
		for(let cmd of cmds){
			kv.push([
				cmd,
				this.key2string(app.hotkeyManager.defaultKeys[cmd])
			])
		}
		return kv
	}

	hotkeys(){
		let cmds = app.hotkeyManager.bakedIds
		let kv = []
		for(let i=0;i<cmds.length;i++){
			kv.push([
				cmds[i],
				this.key2string(app.hotkeyManager.bakedHotkeys[i])
			])
		}
		return kv
	}

	kv2string(kv){
		let skv = JSON.stringify(kv).replace(/\],\[/g,'],\n\t[')
		skv = '[\n\t'+skv.slice(1,skv.length-1)+'\n]'
		return skv
	}

	async set_hotkeys(items){
		let kv = this.hotkeys()
		for(let item of items){
			let prev = kv[kv.map(x=>x[0]).indexOf(item[0])]
			if(prev&&prev[1]==item[1]){
				continue
			}
			if(item[1]==''){
				
				await app.hotkeyManager.removeHotkeys(item[0])
				new Notice('Delete: '+item[0],5000)
			}else{
				await app.hotkeyManager.setHotkeys(
					item[0],
					this.key4string(item[1].replace('Ctrl','Mod'))
				)
				new Notice(`Set ${item[0]} to ${item[1]}`,5000)
			}
		}
	}
}

if(app.tpl){
	app.tpl.HotKeys = HotKeys
}else{
	app.tpl = {
		HotKeys: HotKeys
	}
}

```