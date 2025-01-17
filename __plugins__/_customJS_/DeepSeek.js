class DeepSeek {
	
	constructor() {
		this.url = 'https://api.deepseek.com/chat/completions';
		this.api_key = '';
		this.model_name = 'deepseek-chat'
	}
	
	async request_deepseek(prompt,system='You are a helpful assistant.') {
		let url = this.url
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.api_key}`
		};
		
		let body = {
			model: this.model_name,
			messages: [
				{ role: 'system', content: system },
				{ role: 'user', content: prompt }
			],
			
			stream: false
		};
		
		try {
			let response = await requestUrl({
				url,
				method: 'POST',
				headers:headers,
				body: JSON.stringify(body)
			});
			let rsp = JSON.parse(response.text).choices[0].message
			return rsp;
		} catch (error) {
			return {role:'error',text:error}
		}
	}
	
	
}
