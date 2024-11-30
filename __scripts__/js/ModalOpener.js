class ModalOpener {
    wait_for_modal_to_close(el='.modal.modal-opener') {
	  return new Promise(resolve => {
		const intervalId = setInterval(() => {
		  const modalOpener = document.querySelector(el);
		  if (!modalOpener) {
			clearInterval(intervalId);
			resolve();
		  }
		}, 100); // 每 100 毫秒检查一次
	  });
	}

	async prompt_by_modal_opener(text='',tfile='临时输入.md'){
		let nc = app.plugins.getPlugin('note-chain')
		let mp = app.plugins.plugins["modal-opener"]
		if(!nc || !mp){
			return ''
		}
		let cfile = nc.chain.get_tfile(tfile)
		if(!cfile){
			cfile = await app.vault.create(tfile,'')
		}
		await app.vault.modify(cfile,text)
		await mp.openInFloatPreview(cfile.path)
		await this.wait_for_modal_to_close('.modal.modal-opener')
		let ctx = await app.vault.cachedRead(cfile)
		return ctx
	}
	
	async get_current_section(by_suggester=false){
		let nc = app.plugins.getPlugin('note-chain')
		
		let view = app.workspace.getActiveFileView()
		let editor = view.editor;
		let tfile = view.file;
		if(!view || !editor || !tfile){return null}
		let cursor = editor.getCursor();
		let cache = app.metadataCache.getFileCache(tfile)
		if(!cache){return}
		if(!cursor||by_suggester){
			let ctx = await app.vault.cachedRead(tfile);
			let items = cache?.sections?.map(
				section=>ctx.slice(section.position.start.offset,section.position.end.offset)
			)
			if(!items){return null}
			let section = await nc.chain.tp_suggester(items,cache.sections)
			return section

		}else{
			let sections = cache?.sections?.filter(
				x=>{return x.position.end.line>=cursor.line}
			)[0]
			return sections
		}
	}
	
	async editor_current_section(by_suggester=false){
		let section = await this.get_current_section(by_suggester)
		if(!section){return}
		let tfile = app.workspace.getActiveFile()
		let ctx = await app.vault.cachedRead(tfile)
		let curr = ctx.slice(section.position.start.offset,section.position.end.offset)
		let nctx;
		if(section.type=='callout'){
			nctx = await this.prompt_by_modal_opener(curr.replace(/^>\s*/,'').replace(/\n>\s*/g,'\n'))
			if(nctx!=''){
				nctx = '> '+nctx
				nctx = nctx.replace(/\n/g,'\n> ')
			}
		}else{
			nctx = await this.prompt_by_modal_opener(curr)
		}
		
		let res = ctx.slice(0,section.position.start.offset)+nctx+ctx.slice(section.position.end.offset)
		await app.vault.modify(tfile,res)
	}
}
