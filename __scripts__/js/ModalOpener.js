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

	async prompt_by_modal_opener(app,tfile,text=''){
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
}
