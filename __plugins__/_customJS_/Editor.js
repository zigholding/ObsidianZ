class Editor {
	constructor() {
	}

    get nc(){
        return app.plugins.getPlugin('note-chain');
    }

    get qadd(){
        return app.plugins.plugins['quickadd'].api
    }

    get cfile(){
        return this.nc.chain.current_note;
    }

    async select_section(tfile=this.cfile){
        let mcache = app.metadataCache.getFileCache(tfile);
        let sections = Array.from(mcache.sections);
        
        let ctx = await app.vault.cachedRead(tfile);
        let prompts = sections.map(x=>{
            if(x.type=='yaml'){
                return '🔥元数据';
            }
            return this.ctx_slice(ctx,x.position)
        });
        prompts.unshift('🔥全文')
        sections.unshift('全文')

        prompts.unshift('🔥正文')
        sections.unshift('正文')
        
        let sec = await this.nc.dialog_suggest(
            prompts,
            sections
        )
        let res = {}
        res['ctx'] = ctx;
        res['section'] = sec;
        res['sections'] = mcache.sections;
        return res;
    }

    ctx_slice(ctx,position){
        return ctx.slice(position.start.offset,position.end.offset);
    }

    ctx_of_section(ctx,section,sections){
        if(typeof(section)=='string'){        
            if(section=='正文'){
                if(sections[0].type=='yaml'){
                    return ctx.slice(sections[0].position.end.offset)
                }
            }

            if(section=='全文'){
                return ctx;
            }
        }
        return this.ctx_slice(ctx,section.position)
    }

    async copy_section(){
        let res = await this.select_section();
        if(!res){return}
        let ctx = this.ctx_of_section(res['ctx'],res['section'],res['sections']);
        await navigator.clipboard.writeText(ctx);
        return ctx;
    }

    async paste_section(){
        
        let ctx = await navigator.clipboard.readText();
        if(!ctx){return}

        let tfile = this.cfile;
        let res = await this.select_section(tfile);
        if(!res){return}


        if(typeof(res['section'])=='string'){        
            if(res['section']=='正文'){
                if(res['sections'][0].type=='yaml'){
                    ctx = res['ctx'].slice(0,res['sections'][0].position.end.offset)+'\n\n'+ctx;
                }
            }
        }else{
            ctx = res['ctx'].slice(0,res['section'].position.start.offset) + ctx + 
            res['ctx'].slice(res['section'].position.end.offset)
        }
        await app.vault.modify(tfile,ctx)
    }

    async modify_section(){
        let tfile = this.cfile;
        let res = await this.select_section(tfile);
        if(!res){return}
        let ctx = this.ctx_of_section(res['ctx'],res['section'],res['sections']);
        ctx = await customJS.Editor.qadd.wideInputPrompt(tfile.basename,'新内容',ctx);
        if(!ctx){return}
        if(typeof(res['section'])=='string'){        
            if(res['section']=='正文'){
                if(res['sections'][0].type=='yaml'){
                    ctx = res['ctx'].slice(0,res['sections'][0].position.end.offset)+'\n\n'+ctx;
                }
            }
        }else{
            ctx = res['ctx'].slice(0,res['section'].position.start.offset) + ctx + 
            res['ctx'].slice(res['section'].position.end.offset)
        }
        await app.vault.modify(tfile,ctx)
    }

    async invoke() {
        let item = await this.nc.dialog_suggest(
            ['复制','粘贴','修改'],
            ['copy_section','paste_section','modify_section']
        )
        if(item){
            await this[item]();
        }
	}
}
