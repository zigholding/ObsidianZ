<%*
let nc=app.plugins.getPlugin("note-chain");
let ve = app.plugins.getPlugin('vault-exporter');
let path = await nc.chain.tp_prompt('Input uri');
if(ve.fsEditor.isdir(path)){
	let title = await nc.chain.tp_prompt(
		'Check title',
		'📁'+ve.fsEditor.path.basename(path)
	);
	if(title){
		tR+=`[${title}](file:///${path.replace(' ','%20')})`;
	}
}else if(ve.fsEditor.isfile(path)){
	let title = '';
	
	if(['.exe'].contains(ve.fsEditor.path.extname(path))){
		title = '❄️'+ve.fsEditor.path.basename(path);
	}else if(['.lnk'].contains(ve.fsEditor.path.extname(path))){
		title = '📞'+ve.fsEditor.path.basename(path);
	}else{
		title = '📃'+ve.fsEditor.path.basename(path);
	}
	title = await nc.chain.tp_prompt(
		'Check title',
		title
	);
	if(title){
		tR+=`[${title}](file:///${path.replace(' ','%20')})`;
	}
}
%>