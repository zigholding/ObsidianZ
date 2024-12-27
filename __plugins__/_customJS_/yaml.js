class YamlJS{
	mapping_dict(fm,ufunc=(v,p,k,r)=>{},parent=null,key='',path=''){
		ufunc(fm,parent,key,path)
		if(Array.isArray(fm)){
			for(let i in fm){
				let value = fm[i]
				let spath = path
				if(spath==''){
					spath = `[${i}]`
				}else{
					spath = spath+`[${i}]`
				}
				this.mapping_dict(fm[i],ufunc,fm,i,spath)
			}
		}else if(typeof(fm)=='object'){
			for(let key in fm){
				let value = fm[key]
				let spath = path
				if(spath==''){
					spath = key
				}else{
					spath = spath+`.${key}`
				}
				this.mapping_dict(fm[key],ufunc,fm,key,spath)
			}
		}
		return fm
	}
	
	async mapping_str_to_link(app,pat=/.*/){
		let nc = app.plugins.plugins['note-chain']
		let tfiles = nc.chain.get_selected_files()
		for(let tfile of tfiles){
			await app.fileManager.processFrontMatter(
				tfile,
				(fm)=>{
					this.mapping_dict(
						fm,
						(v,p,k,r)=>{
							if(typeof(v)!='string' || !r.match(pat)){
								return
							}
							let cfile = nc.chain.get_tfile(v)
							if(cfile){
								p[k] = `[[${cfile.basename}]]`
							}
						}
					)
				}
			)
		}
		
	}
}
