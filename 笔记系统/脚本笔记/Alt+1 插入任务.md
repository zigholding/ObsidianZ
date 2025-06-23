---
PrevNote: "[[Alias - 修改别名]]"
hotkey: Alt+1
words:
  2024-10-28: 372
  2024-11-05: 431
  2024-11-07: 437
  2025-06-04: 452
  2025-06-09: 405
  2025-06-17: 753
NextNote: "[[Alt+2 插入瞬时笔记]]"
emoji: 📣
tags:
  - Publish/ObsidianZ
  - 脚本笔记
---

[[2024-10-28]]：
- 根据输入的文本开头判定日期
- 添加任务后在弹窜打开[[今日事项]]

[[2024-10-28]]：
- 结合 [[Task]] 插件添加任务


最终确定的处理流程为：
1. 判断当前行是否为任务；
2. 如果是任务，则剪切复制到日志中；这种适用于编辑视图下创建任务。
3. 如果不是任务，则通过 [[Tasks]] 弹窗创建任务；这种适用于阅读视图下创建任务。


```js //templater
let qa = app.plugins.plugins['quickadd'].api;

let task = {
	date: moment().format('YYYY-MM-DD'),
	item: ''
}

let area = tp.config.extra?.area;
if(area){
	task['item'] = area.value.replace(/\n/g,'');
}

if(!task['item']){
	task['item'] = ea.ceditor?.getSelection()
}

if(!task['item']){
	// 通过 quickadd 输入
	let qa = app.plugins.plugins['quickadd'].api;
	task['item'] = await qa.inputPrompt('⛳task','Type text here');
	if(!task['item']){return}
}
if(task['item'].startsWith('今天')){
	task['item'] = task['item'].slice(2);
}
if(task['item'].startsWith('明天')){
	task['item'] = task['item'].slice(2);
	task['date'] = moment().add(1,'day').format('YYYY-MM-DD')
}else if(task['item'].startsWith('后天')){
	task['item'] = task['item'].slice(2);
	task['date'] = moment().add(2,'day').format('YYYY-MM-DD')
}else if(task['item'].startsWith('大后天')){
	task['item'] = task['item'].slice(3);
	task['date'] = moment().add(3,'day').format('YYYY-MM-DD')
}else if(/^(下*)(周一|周二|周三|周四|周五|周六|周日|星期[一二三四五六日])/.test(task['item'])){
    // 处理周几和下周几
    const match = task['item'].match(/^(下*)(周一|周二|周三|周四|周五|周六|周日|星期[一二三四五六日])/);
    const isNextWeek = match[1].length > 0; // 是否有"下"前缀
    const dayOfWeek = match[2];
    
    // 移除日期关键词
    task['item'] = task['item'].slice(match[0].length);
    
    // 转换为数字 (1-7, 1=周一)
    let targetDay;
    if(dayOfWeek.includes('周') || dayOfWeek.includes('星期')){
        const dayChar = dayOfWeek.slice(-1);
        const dayMap = {'一':1, '二':2, '三':3, '四':4, '五':5, '六':6, '日':7};
        targetDay = dayMap[dayChar];
    }else{
        targetDay = parseInt(dayOfWeek.slice(-1));
    }
    
    // 计算目标日期
    let date = moment();
    if(isNextWeek){
        date.add(1, 'week');
    }
    date.day(targetDay === 7 ? 0 : targetDay); // moment.js 中周日是0
    
    // 如果目标日期已经过去（在当前周），且不是下周，则跳到下周
    if(date.isBefore(moment(), 'day') && !isNextWeek){
        date.add(1, 'week');
    }
    
    task['date'] = date.format('YYYY-MM-DD');
}else if(/^\d{1,2}月\d{1,2}号?/.test(task['item'])){
    // 处理x月y号格式
    const match = task['item'].match(/^(\d{1,2})月(\d{1,2})号?/);
    const month = parseInt(match[1]);
    const day = parseInt(match[2]);
    
    // 移除日期关键词
    task['item'] = task['item'].slice(match[0].length);
    
    // 计算目标日期
    let date = moment();
    date.month(month - 1); // moment.js 中月份是0-11
    date.date(day);
    
    // 如果目标日期已经过去（在今年），则跳到下一年
    if(date.isBefore(moment(), 'day')){
        date.add(1, 'year');
    }
    
    task['date'] = date.format('YYYY-MM-DD');
}

if(false){
	let stask = ea.editor.yamljs.dump(task);
	stask = await qa.wideInputPrompt('输入任务','使用Yaml格式',stask);
	if(!stask){return}
	task = ea.editor.yamljs.load(stask);
}

let aline = '- [ ]'

aline = aline + ` (item::${task.item}) 📅 ${task.date}`
for(let k in task){
	let skip = ['date','item'];
	if(skip.contains(k)){continue}
	aline = aline + ` (${k}::${task[k]})`
}

aline = aline.trim();
if(!aline){return}

let TODAY = moment().format('YYYY-MM-DD')
let LINE = '> [!note]+ 新建事项New\n';
let tfile = nc.chain.get_last_daily_note();
if(!tfile){return}
let ctx = await app.vault.cachedRead(tfile)

let idx = ctx.indexOf(LINE)
if(idx==-1){
	ctx = `${ctx}\n\n${aline}`
}else{
	ctx = `${ctx.slice(0,idx+LINE.length)}\n${aline}${ctx.slice(idx+LINE.length)}`
}
	
await app.vault.modify(tfile,ctx)

if(area){
	area.value = '';
}
await nc.chain.open_note_in_modal('今日事项')
```

