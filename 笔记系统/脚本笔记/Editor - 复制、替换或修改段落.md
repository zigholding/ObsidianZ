---
PrevNote: "[[Canvas 笔记转白板]]"
NextNote: "[[Editor - 替换段落]]"
words:
  2025-06-04: 416
  2025-06-09: 454
  2026-03-17: 453
tags:
  - Publish/ObsidianZ
emoji: 📣
---

通过 `tp.config.extra` 传入不同的参数，实现：

- [[Editor - 复制段落]]
- [[Editor - 替换段落]]
- [[Editor - 修改段落]]


```js //templater
class Editor {
    constructor() {
    }
    get nc(){
        return app.plugins.getPlugin('note-chain');
    }
    get qadd(){
        return app.plugins.plugins['quickadd']
    }
    get cfile(){
        return this.nc.chain.current_note;
    }
    
    async select_section(tfile=this.cfile){
        let mcache = app.metadataCache.getFileCache(tfile);
        let sections = Array.from(mcache.sections);
        
        let ctx = await app.vault.cachedRead(tfile);
        let prompts = sections.map(x=>{
            if(x.type=='yaml'){
                return '🔥元数据';
            }
            return this.ctx_slice(ctx,x.position)
        });

        for(let i of ['🔥全文','🔥正文']){
	        prompts.unshift(i)
	        sections.unshift(i)
        }
        
        let sec = await ea.dialog_suggest(
            prompts.map(x=>x.split('\n').slice(0,10).join('\n')),
            sections
        )
        let res = {}
        res['ctx'] = ctx;
        res['section'] = sec;
        res['sections'] = mcache.sections;
        return res;
    }
    
    ctx_slice(ctx,position){
        return ctx.slice(position.start.offset,position.end.offset);
    }
    
    ctx_of_section(ctx,section,sections){
        if(typeof(section)=='string'){        
            if(section=='正文'){
                if(sections[0].type=='yaml'){
                    return ctx.slice(sections[0].position.end.offset)
                }
            }
            if(section=='全文'){
                return ctx;
            }
        }
        return this.ctx_slice(ctx,section.position)
    }
    
    async copy_section(){
        let res = await this.select_section();
        if(!res?.section){return}
        let ctx = this.ctx_of_section(res['ctx'],res['section'],res['sections']);
        await navigator.clipboard.writeText(ctx);
        return ctx;
    }
    
    async replace_section(){
        let ctx = await navigator.clipboard.readText();
        if(!ctx){return}
        let tfile = this.cfile;
        let res = await this.select_section(tfile);
        if(!res?.section){return}
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
        let tfile = this.cfile;
        let res = await this.select_section(tfile);
        if(!res?.section){return}
        let ctx = this.ctx_of_section(res['ctx'],res['section'],res['sections']);
        ctx = await this.qadd.api.wideInputPrompt(tfile.basename,'新内容',ctx);
        if(ctx==null){return}
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
}
if(tp.config.extra){
	let editor = new Editor();
	if(editor[tp.config.extra]){
		await editor[tp.config.extra]();
	}
}
```

