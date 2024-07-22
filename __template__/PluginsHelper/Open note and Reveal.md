<%*
let nc = app.plugins.getPlugin('note-chain');

let note = await nc.chain.sugguster_note();
if(note){
	await nc.chain.open_note(note);
	
	await nc.explorer.file_explorer.tree.setCollapseAll(true);
	await nc.explorer.file_explorer.revealInFolder(note);
	await sleep(100);
	
	containerEl = nc.explorer.file_explorer.containerEl;
	panel = containerEl.querySelector('.nav-files-container');
	itemEl=containerEl.querySelector(`[data-path="${note.path}"]`);
	
	xtop = panel.scrollTop+(itemEl.offsetTop-(panel.scrollTop+panel.clientHeight/2))
	panel.scrollTo({ top: xtop, behavior: 'smooth' });
}

-%>
