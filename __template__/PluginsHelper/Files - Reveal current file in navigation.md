<%*
nc=app.plugins.getPlugin('note-chain');
await nc.explorer.file_explorer.tree.setCollapseAll(true);
await nc.explorer.file_explorer.revealInFolder(nc.chain.current_note);
await sleep(500);

containerEl = nc.explorer.file_explorer.containerEl;
panel = containerEl.querySelector('.nav-files-container');
itemEl=containerEl.querySelector(`[data-path="${nc.chain.current_note.path}"]`);

xtop = panel.scrollTop+(itemEl.offsetTop-(panel.scrollTop+panel.clientHeight/2))
panel.scrollTo({ top: xtop, behavior: 'smooth' });
-%>