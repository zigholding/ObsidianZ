---
PrevNote: "[[Echarts 人生进度]]"
NextNote: "[[ECharts 公众号发表热力图]]"
words:
  2025-06-04: 73
  2025-06-05: 83
  2025-06-08: 79
---



```dataviewjs
await easyapi.nc.utils.parse_templater(app,'ECharts 绘制热力图日历');

let year = moment().year();
let st = moment().add(-1,'year').format('YYYY-MM-DD');
let a = easyapi.nc.wordcout.sum_words_of_tifles(null,st);
let b = easyapi.nc.wordcout.diff_words_of_tifles(a);

let hmap = new app.tpl.HeatmapCalendar(dv,year);
if(this.container.querySelectorAll('div.echarts-container').length==0){
	hmap.render_daily_value(this.container,b,"每日字数",true,'2+12');
}
```

