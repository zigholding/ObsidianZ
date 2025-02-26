class Doubao {
	constructor() {
		this.folder = app.vault.getFolderByPath('公众号历史文章');
		this.view = this.get_view_of_webviewer()[0];
	}

	set_webviewer(view=null){
		if(!view){
			view = this.get_view_of_webviewer()[0]
		}
		this.view = view;
	}

	get_view_of_webviewer(active=false,prefix='https://www.doubao.com'){
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
		if(view.length==0){
			await app.commands.executeCommandById('webviewer:open');
			await this.delay(3000);
			view = this.get_view_of_webviewer(false,'about:blank')[0];
		}else{
			view = view[0]
		}
		let url = 'https://www.doubao.com';
		await view.webview.setAttr('src',url)
		return view
	}

	async document(){
		let html = await customJS.WebViwer.get_src_of_view(this.view);
		let doc = customJS.WebViwer.html_to_dom(html);
		return doc;
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
				let button = document.getElementById('flow-end-msg-send');
				let ariaDisabled = button.getAttribute('aria-disabled');
				while(ariaDisabled=='false'){
					button.click();
					await delay(100);
					button = document.getElementById('flow-end-msg-send');
					ariaDisabled = button.getAttribute('aria-disabled');
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
					console.log('hrer',document)
					let item = document.querySelector('textarea[data-testid="chat_input_input"]');
					item.focus();

					// 插入文本
					setTimeout(() => {
						document.execCommand('insertText', false, ctx);
					}, 1000);
					let i = 100;
					// 等待按钮可点击
					while (true) {
						let button = document.getElementById('flow-end-msg-send');
						let ariaDisabled = button.getAttribute('aria-disabled');
						if (ariaDisabled == 'false') {
							console.log('复制成功');
							break;
						} else {
							await delay(100);
						}
						i = i-1;
						if(i<0){break}
					}
				}

				// 调用 async 函数
				insertTextAndSend(\`${ctx}\`);
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

	async number_of_receive_msg(){
		let view = this.view;
		let msg = await view.webview.executeJavaScript(
			`
			function number_of_receive_msg(){
				let items = document.querySelectorAll('div[data-testid="receive_message"]');
				if(items.length==0){
					return 0;
				}
				item = items[items.length-1]
				if(item.querySelectorAll('button[data-testid="message_action_like"]').length==0){
					msg = items.length-1;
				}else{
					msg = items.length;
				}
				return msg;
			}
			number_of_receive_msg()
			`
		)
		return msg;
	}

	async copy_last_content(view){
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

	async number_of_contents(){
		let doc = await customJS.Doubao.document();
		let items = doc.querySelectorAll('.message-content')
		return items.length;
	}

	async get_last_content(){
		let doc = await customJS.Doubao.document();
		let items = doc.querySelectorAll('.message-content')
		return items[items.length-1].textContent
	}


	async request(ctx,timeout=60){
		let view = this.view;
		let N1 = await this.number_of_receive_msg();

		await this.paste_msg(ctx);
		await this.delay(1000);
		let click = await this.click_btn_of_send();
		let N2 = await this.number_of_receive_msg();
		
		while(N2!=N1+1){
			await this.delay(1000);
			N2 = await this.number_of_receive_msg();
			timeout = timeout-1;
			if(timeout<0){
				break;
			}
		}
		if(N2==N1+1){
			let doc = await customJS.Doubao.document();
			let items = doc.querySelectorAll('.message-content')
			N2 = await this.number_of_contents()
			new Notice('Doubao 说了点什么')
			return items[N2-1].textContent;
		}else{
			new Notice('Doubao 不说话');
			console.log('Doubao N:',N1,N2)
			return null;
		}
	}

	delay(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
}
