class NoteGallery {
    lcg(seed) {
		// 线性同余生成器参数
		let a = 1664525;
		let c = 1013904223;
		let m = Math.pow(2, 32); // 2^32
		return (a * seed + c) % m;
	}

	generateRandomIntsForDate(t, n, N) {
		if (n >= N) {
			return Array.from({ length: N }, (_, i) => i);  // 生成从 0 到 N-1 的数组
		}
		let seed = t.unix();
		let randomInts = new Set();  // 使用 Set 来存储随机数
		let currentSeed = seed;
		let ntry = 0;
		while (randomInts.size < n) {  // 直到生成 n 个不重复的随机数
			currentSeed = this.lcg(currentSeed);
			let randomInt = Math.floor(currentSeed % N);
			randomInts.add(randomInt);  // Set 会自动去重
			ntry = ntry+1
			if(ntry>3*n){
				break
			}
		}

		return Array.from(randomInts).sort((a, b) => a - b);  // 转换回数组并排序
	}
	
	get_daily_random_notes(n=5,before_today=true){
		let t = moment(moment().format('YYYY-MM-DD') )
		let nc = app.plugins.getPlugin('note-chain')
		let dnote = nc.chain.get_last_daily_note()
		if(dnote){
			t = moment(dnote.basename)
		}
		let tfiles = nc.chain.get_all_tfiles();
		tfiles = nc.chain.sort_tfiles(tfiles,'ctime')
		if(before_today){
			tfiles = tfiles.filter(
				f=>f.stat.ctime<t.unix()*1000
			)
		}
		let idx = this.generateRandomIntsForDate(t,n,tfiles.length)
		tfiles = idx.map(i=>tfiles[i])
		return dnote,tfiles
	}
	
	code_block_for_notes(tfiles){
		if(tfiles.length==0){
			return ''
		}
		
		let query = `file: "${tfiles[0].basename}"`
		for(let tfile of tfiles.slice(1)){
			query = `${query} OR file: "${tfile.basename}"`
		}
		let code = 
`
~~~note-gallery
query: '${query}'
limit: ${tfiles.length}
~~~
`
		return code
	}

}
