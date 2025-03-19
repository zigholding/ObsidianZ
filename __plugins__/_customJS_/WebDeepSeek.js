class WebDeepSeek {
	constructor() {
		this.name = 'DeepSeek'
		this.homepage = 'https://chat.deepseek.com'
		this.view = this.get_view_of_webviewer()[0];
	}

	set_webviewer(view=null){
		if(!view){
			view = this.get_view_of_webviewer()[0]
		}
		this.view = view;
	}

	get_view_of_webviewer(active=false,prefix=this.homepage){
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
		await view.webview.setAttr('src',this.homepage)
		return view
	}

	async document(){
		let html = await customJS.WebViwer.get_src_of_view(this.view);
		let doc = customJS.WebViwer.html_to_dom(html);
		return doc;
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
					let item = document.querySelector('textarea[id="chat-input"]');
					item.focus();

					// 插入文本
					setTimeout(() => {
						document.execCommand('insertText', false, ctx);
					}, 1000);
					let i = 100;
					// 等待按钮可点击
					while (true) {
						let button = document.querySelector('div[role="button"]:not(.ds-button)');
						let ariaDisabled = button.getAttribute('aria-disabled');
						if (!ariaDisabled || ariaDisabled == 'false') {
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
				let button = document.querySelector('div[role="button"]:not(.ds-button)');
				let ariaDisabled = button.getAttribute('aria-disabled');
				while(!ariaDisabled || ariaDisabled == 'false'){
					button.click();
					await delay(100);
					button = document.querySelector('div[role="button"]:not(.ds-button)');
					ariaDisabled =  button.getAttribute('aria-disabled');
				}
			}
			click();
			`
		)
		return msg;
	}


	async get_last_response(){
		let doc = await this.document();
		let items = doc.querySelectorAll('.ds-markdown');
		if(items.length<1){return null}
		
		let item = items[items.length-1]
		let ctx = customJS.WebViwer.html_to_markdown(item.outerHTML);
		return ctx;
	}

	async number_of_receive_msg(){
		let view = this.view;
		let msg = await view.webview.executeJavaScript(
			`
			function number_of_receive_msg(){
				let N = parseInt(document.querySelectorAll('rect[id="复制"]').length/2);
				return N;
			}
			number_of_receive_msg()
			`
		)
		return msg;
	}

	async number_of_contents(){
		let doc = await customJS.Doubao.document();
		let items = doc.querySelectorAll('.message-content')
		return items.length;
	}

	async request(ctx,timeout=60){
		let view = this.view;
		let N1 = await this.number_of_receive_msg();

		await this.paste_msg(ctx);
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
			let ctx = await this.get_last_response();
			new Notice(`${this.name} 说了点什么`)
			return ctx;
		}else{
			new Notice(`${this.name} 不说话`)
			return null;
		}
	}

	delay(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
}
