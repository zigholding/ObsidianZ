---
PrevNote: "[[Echarts 人生进度]]"
NextNote: "[[ECharts 公众号发表热力图]]"
words:
  2025-06-04: 73
  2025-06-05: 83
  2025-06-08: 79
  2025-06-07: 83
  2025-06-16: 136
---



```dataviewjs
await easyapi.nc.utils.parse_templater(app,'DailyStats - 每日统计库');

let b = app.tpl.DailyStats.get_daily_stats('stats.WordCount',-2);

let hmap = new app.tpl.HeatmapCalendar(dv,2025);
if(this.container.querySelectorAll('div.echarts-container').length==0){
	hmap.render_daily_value(this.container,b,"每日字数",true,'2+12');
}
```


通过 [[DailyStats - 每日统计库]] 更新最近的统计数据：

```js //templater
await easyapi.nc.utils.parse_templater(app,'DailyStats - 每日统计库');

let year = moment().year();
let st = moment().add(-1,'year').format('YYYY-MM-DD');
let a = easyapi.nc.wordcout.sum_words_of_tifles(null,st);
let b = easyapi.nc.wordcout.diff_words_of_tifles(a);

let field = 'stats.WordCount';
await app.tpl.DailyStats.update_daily_stats(b,field);
```