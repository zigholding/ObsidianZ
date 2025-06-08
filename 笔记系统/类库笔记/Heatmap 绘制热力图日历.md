---
PrevNote: "[[类库笔记]]"
NextNote: "[[ECharts 绘制热力图日历]]"
words:
  2025-06-03: 263
  2025-06-04: 265
  2025-06-08: 267
---



### 使用示例l


根据元数据绘制热力图：
- [[ECharts 公众号发表热力图]]

```dataviewjs
let nc = app.plugins.getPlugin('note-chain')
await nc.utils.parse_templater(app,'Heatmap 绘制热力图日历')

let hmap = new app.tpl.Heatmap(dv,2025);
hmap.heatmap_of_field(this.container,'date',p => p.link && p.date,"📖 公众号");
```




### 类对象

```js //templater
class Heatmap {
	constructor(dv,year) {
		this.year = year;
		this.dv = dv
	}
	
	dt_fmt(t){
		try{
			return this.dv.func.dateformat(t,'yyyy-MM-dd')
		}catch(error){
			console.log("error：", error.message);
			console.log(t)
			return null
		}
	}
	
	async heatmap_of_field(container,field,where,title=null,nhap=1){
		if(container.querySelectorAll('div.heatmap-calendar-graph').length>=nhap){
			return
		}
		if(title){
			this.dv.span(`** ${title} **`)
		}
		
		const calendarData = {
			year: this.year,
			colors: {
				blue: ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"],
				green: ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"],
				red: ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"],
				orange: ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"],
				pink: ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"],
				orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"]
			},
			showCurrentDayBorder: true,
			defaultEntryIntensity: 5,
			intensityScaleStart: 0.25,
			intensityScaleEnd: 3,
			entries: [],
		}

		let pages = this.dv.pages()
			.where(where);
			
		for (let page of pages) {
			if(Array.isArray(page[field])){
				console.log(page)
			}
			if(page[field]?.year!=this.year){
				continue;
			}
			let t = this.dt_fmt(page[field]);
			if(!t){
				console.log(page)
			}
			calendarData.entries.push({
				date: t,
				intensity: 1,
				color: "orange",
			})
		}
		renderHeatmapCalendar(container, calendarData)
	}
}
if(app.tpl){
	app.tpl.Heatmap = Heatmap
}else{
	app.tpl = {
		Heatmap: Heatmap
	}
}
```

按同样的思路，也可以替换 `tp.user` 用户函数。