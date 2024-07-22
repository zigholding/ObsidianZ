<%*
async function gantt_add_item(tfile){
	if(!tfile){return;}
	let ctx = await app.vault.cachedRead(tfile);
	let rgx = /\`\`\`mermaid\ngantt([\s\S]*?)\`\`\`/
	let matches = ctx.match(rgx);
	if(!matches){return;}
	
	let msg = matches[0];
	let sections=msg.split('\n').filter(x=>x.startsWith('section'));
	let nc=app.plugins.getPlugin('note-chain');
	let section = await tp.system.suggester(
		nc.utils.array_prefix_id(sections.map(s=>s.slice(7))),
		sections,
		false,
		'选择任务section'
	)
	if(section){
		let item = await tp.system.prompt('请输入事项（name : time,dura）');
		if(!item || item==''){
			return;
		}
		
		if(! item.contains(':')){
			let suffix = await tp.system.prompt('请输入时间（HH-MM,dura）');
			if(!suffix){
				new Notice('请输入有效时间',3000);
				return;
			}
			item = item+' : ' + suffix.trim()
		}
		
		if(!item.match(/[\S ]+ ?: ?([\S ]*)?(\d\d:\d\d,)?\d[mh]$/)){
			new Notice('请输入有效事项：'+item,3000);
			return;
		}
		item = item.replace(' : ms,',' : milestone,');
		let idx = sections.indexOf(section);
		let msg2;
		if(idx == sections.length-1){
			// 最后 section
			msg2 = `${msg.slice(0,-3).trim()}    ${item}\n\`\`\``;
		}else{
			msg2 = msg.slice(0,msg.indexOf(sections[idx+1])).trim();
			msg2 = `${msg2}\n    ${item}\n`;
			msg2 = `${msg2}\n${msg.slice(msg.indexOf(sections[idx+1])).trim()}`;
		}
		let ctx2 = ctx.replace(rgx,msg2);
		await app.vault.process(tfile,s=>ctx2);
		new Notice(`${tfile.basename}插入事项:${item}`)
	}
}

let tfile = tp.user.get_last_daily_note();
await gantt_add_item(tfile);
-%>