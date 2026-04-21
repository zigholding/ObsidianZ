---
PrevNote: "[[脚本笔记]]"
hotkey: Alt+1
words:
  2024-10-28: 372
  2024-11-05: 431
  2024-11-07: 437
  2025-06-04: 452
  2025-06-09: 405
  2025-06-17: 753
  2025-06-24: 399
  2025-06-26: 365
  2025-07-25: 389
  2025-11-07: 483
NextNote: "[[Alt+2 插入瞬时笔记]]"
mcp_tool: true
description: 插入任务事项
inputSchema:
  properties:
    date:
      type: string
      description: 事项完成时间，格式YYYY-mm-dd，如2025-01-01
    content:
      type: string
      description: 任务内容
  required:
    - notes
emoji: 📣
tags:
  - Publish/ObsidianZ
  - 脚本笔记
---

[[2025-06-24]]：
 - 日期判定逻辑封装为 `ea.time.extract_chinese_date`

[[2024-06-04]]：
- 根据输入的文本开头判定日期
- 添加任务后在弹窜打开[[今日事项]]

[[2024-10-28]]：
- 结合 [[Task]] 插件添加任务


最终确定的处理流程为：
1. 判断当前行是否为任务；
2. 如果是任务，则剪切复制到日志中；这种适用于编辑视图下创建任务。
3. 如果不是任务，则通过 [[Tasks]] 弹窗创建任务；这种适用于阅读视图下创建任务。


```js //templater
// templater
let task_date = tp.config.extra?.date || null;
let task_ctx = tp.config.extra?.content || null;
let area_is_task = false;
let qa = app.plugins.plugins['quickadd'].api;
let area = null;

let task = {
	date: moment().format('YYYY-MM-DD'),
	item: ''
};

// ✅ 优先使用传入的 task_date / task_ctx
if (task_date) {
	task.date = task_date;
}
if (task_ctx) {
	task.item = task_ctx;
}

// ✅ 如果两者都存在，则直接跳过后续提取逻辑
if (!(task_date && task_ctx)) {

	area = tp.config.extra?.area;
	if (area) {
		if (!ea.time.parse_time(area.value.split('\n')[0].trim())) {
			task['item'] = area.value.replace(/\n/g, '');
			area_is_task = true;
		}
	}

	if (!task['item']) {
		task['item'] = ea.ceditor?.getSelection();
	}

	if (!task['item']) {
		// 通过 quickadd 输入
		let qa = app.plugins.plugins['quickadd'].api;
		task['item'] = await qa.inputPrompt('⛳task', 'Type text here');
		if (!task['item']) { return; }
	}

	let cmsg = ea.time.extract_chinese_date(task['item']);
	if (cmsg.date) {
		task.date = cmsg.date.format('YYYY-MM-DD');
		task.item = cmsg.text;
	}
}

// 校验任务内容
if (task.item.trim() == '') {
	new Notice('请输入具体事项');
	return;
}

// 调试模式（YAML 编辑）
if (false) {
	let stask = ea.editor.yamljs.dump(task);
	stask = await qa.wideInputPrompt('输入任务', '使用Yaml格式', stask);
	if (!stask) { return; }
	task = ea.editor.yamljs.load(stask);
}

// 构造任务行
let aline = '- [ ]';
aline = aline + ` (item::${task.item}) 📅 ${task.date}`;
for (let k in task) {
	let skip = ['date', 'item'];
	if (skip.contains(k)) { continue; }
	aline = aline + ` (${k}::${task[k]})`;
}
aline = aline.trim();
if (!aline) { return; }

// 插入到“今日事项”
let TODAY = moment().format('YYYY-MM-DD');
let LINE = '> [!note]+ 新建事项New\n';
let tfile = ea.nc.chain.get_last_daily_note();

let flag = await ea.editor.insert_after_line(tfile, aline, LINE);

if (area && area_is_task) {
	area.value = '';
}

if (flag) {
	// await ea.nc.chain.open_note_in_modal('今日事项');
}
```

