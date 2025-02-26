class Kimi {
	constructor() {
		this.folder = app.vault.getFolderByPath('公众号历史文章');
		this.view = this.get_view_of_webviewer()[0];
	}

	async document(){
		let html = await customJS.WebViwer.get_src_of_view(this.view);
		let doc = customJS.WebViwer.html_to_dom(html);
		return doc;
	}

	set_webviewer(view=null){
		if(!view){
			view = this.get_view_of_webviewer()[0]
		}
		this.view = view;
	}

	get_view_of_webviewer(active=false,prefix='https://kimi.moonshot.cn/'){
		let a = [];
		app.workspace.iterateAllLeaves(
		  x=>{
			if(x.view.webview){
			  a.push(x)
			}
		  }
		)
		if(active){
		  a = a.filter(x=>x.containerEl.className.contains('mod-active'));
		}
		return a.map(x=>x.view).filter(x=>x.url.startsWith(prefix));
	}

	async open_homepage(){
		let view = this.get_view_of_webviewer();
		console.log(view)
		if(view.length==0){
			await app.commands.executeCommandById('webviewer:open');
			await this.delay(3000);
			view = this.get_view_of_webviewer(false,'about:blank')[0];
		}else{
			view = view[0]
		}
		let url = 'https://kimi.moonshot.cn/';
		await view.webview.setAttr('src',url)
		return view
	}

	async click_btn_of_send(){
		let view = this.view;
		let msg = await view.webview.executeJavaScript(
			`
			function delay(ms) {
				return new Promise(resolve => {
					setTimeout(resolve, ms);
				});
			}
			async function click(){
				let button = document.querySelector('.send-button');
				let ariaDisabled = button.parentElement.classList.contains('disabled');
				while(!ariaDisabled){
					button.click();
					await delay(100);
					button = document.querySelector('.send-button');
					ariaDisabled = button.parentElement.classList.contains('disabled');
				}
			}
			click();
			`
		)
		return msg;
	}


	async paste_msg(ctx) {
		let view = this.view;
		let msg;
		let safeCtx = JSON.stringify(ctx);
		const maxRetries = 1; // 最大重试次数
		for (let attempt = 0; attempt < maxRetries; attempt++) {
			msg = await view.webview.executeJavaScript(
				`
				function delay(ms) {
					return new Promise(resolve => {
					setTimeout(resolve, ms);
					});
				}

				// 将异步逻辑封装到一个 async 函数中
				async function insertTextAndSend(ctx) {
					// 获取 textarea 并聚焦
					let item = document.querySelector('.chat-input-editor-container').querySelector('.chat-input-editor');
					item.focus();

					// 插入文本
					setTimeout(() => {
						document.execCommand('insertText', false, ctx);
					}, 1000);
					let i = 100;
					// 等待按钮可点击
					while (true) {
						let button = document.querySelector('.send-button');;
						let ariaDisabled = button.parentElement.classList.contains('disabled');
						if (ariaDisabled == false) {
							break;
						} else {
							await delay(100);
						}
						i = i-1;
						if(i<0){break}
					}
				}

				// 调用 async 函数
				insertTextAndSend(\`${safeCtx}\`);
				`
			);
			// 检查是否成功粘贴
			if (msg) {
				break; // 如果成功，退出重试循环
			}
			await this.delay(1000); // 等待一段时间后重试
		}
		return msg;
	}


	get_last_response(html){
		let doc = this.html_to_dom(html);
		let spans = doc.querySelectorAll('span.segment-code-copy[data-v-d3e67ab0]');
		spans.forEach(span => {
			span.remove();
		});
		let ctx = ''
		let chats = doc.getElementsByClassName("chat-content-item");
		for (let i = 0; i < chats.length; i++) {
			let item = chats[i].getElementsByClassName('segment-content-box')[0];
			
			let is_user = chats[i].getElementsByClassName('segment-user').length>0;
			let prev = `[!NOTE] Kimi`
			if(is_user){
				prev = `[!Question] User`
			}
			let cctx = this.html_to_markdown(item.outerHTML).replace(/JavaScript```/g,'\n\n```js').replace(/\n/g,'\n> ');
			ctx = ctx+`\n\n> ${prev}\n>\n> ${cctx}`;
		}
		ctx = ctx+'\n';
		return ctx;
	}

	async number_of_copy_btns(){
		let view = this.view;
		let msg = await view.webview.executeJavaScript(
			`
			btns = document.querySelectorAll('.segment-actions-content-btn');
			btns = Array.from(btns).filter(x=>x.textContent=='复制');
			btns.length;
			`
		)
		return msg;
	}

	async copy_last_content(){
		let view = this.view;
		let msg = await view.webview.executeJavaScript(
			`
			btns = document.querySelectorAll('.segment-actions-content-btn');
			btns = Array.from(btns).filter(x=>x.textContent=='复制');
			if(btns.length>0){
				btns[btns.length-1].click();
				msg = true;
			}else{
				msg = false;
			}
			`
		)
		return msg;
	}

	async get_last_content(){
		let doc=await this.document();
		let chats = doc.getElementsByClassName("chat-content-item");
		return chats[chats.length-1].querySelector('.segment-content-box').textContent
	}

	async request(ctx,timeout=60){
		let view = this.view;
		let N1 = await this.number_of_copy_btns();
		// console.log(N1);
		await this.paste_msg(ctx);
		await this.delay(1000);
		await this.click_btn_of_send();
		let N2 = await this.number_of_copy_btns();
		// console.log('N',N1,N2);
		while(N2!=N1+1){
			await this.delay(1000);
			N2 = await this.number_of_copy_btns();
			timeout = timeout-1;
			if(timeout<0){
				break;
			}
		}
		if(N2==N1+1){
			let doc=await this.document();
			let chats = doc.getElementsByClassName("chat-content-item");
			new Notice('Kimi 说了点什么');
			return chats[chats.length-1].querySelector('.segment-content-box').textContent
			
		}else{
			new Notice('Kimi 不说话');
			console.log('Kimi N:',N1,N2)
			return null;
		}
	}

	delay(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
}
