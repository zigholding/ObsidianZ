<%*
async function gantt_modify_item(tfile){
	if(!tfile){return;}
	let ctx = await app.vault.cachedRead(tfile);
	let rgx = /\`\`\`mermaid\ngantt([\s\S]*?)\`\`\`/
	let matches = ctx.match(rgx);
	if(!matches){return;}
	
	let msg = matches[0];
	let items = msg.split('\n');
	
	let idx = Array.from({ length: items.length - 1 }, (_, index) => index);
	idx = idx.filter(i=>items[i].match(/[\S ]+ ?: ?([\S ]*)?(\d\d:\d\d,)?\d[mh]$/))
	
	let nc=app.plugins.getPlugin('note-chain');
	
	let section = await tp.system.suggester(
		nc.utils.array_prefix_id(idx.map(i=>items[i])),
		idx,
		false,
		'选择修改事项'
	)
	
	if(section){
		let item = await tp.system.prompt('请输入事项（name : time,dura）',items[section]);
		if(!item || item==''){
			return;
		}
		if(!item.match(/[\S ]+ ?: ?([\S ]*)?(\d\d:\d\d,)?\d[mh]$/)){
			new Notice('请输入有效事项：'+item,3000);
			return;
		}
		items[section]=item;
		let ctx2 = ctx.replace(rgx,items.join('\n'));
		await app.vault.process(tfile,s=>ctx2);
	}
}

let tfile = tp.user.get_last_daily_note();
await gantt_modify_item(tfile);
-%>