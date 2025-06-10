---
PrevNote: "[[Heatmap 绘制热力图日历]]"
NextNote: "[[Hotkeys库 - 设置快捷键]]"
words:
  2025-06-04: 144
  2025-06-05: 264
tags:
  - 启动脚本
---


```js //templater
class HeatmapCalendar{
	constructor(dv) {
		this.dv = dv
		this.echarts = app.plugins.plugins['obsidian-echarts'];
	}

	get_range(data,range='year'){
		data = data.sort((a,b)=>a[0].localeCompare(b[0]));
		if(range=='year'){
			return [data[data.length-1][0].slice(0,4)]
		}else if(range=='years'){
			return [
				data[0][0].slice(0,4)+'-01',
				data[data.length-1][0].slice(0,4)+'-12'
			]
		}else if(range=='day'){
			return [
				data[0][0],
				data[data.length-1][0]
			]
		}else if(range.match(/^\d+\+\d+$/)){
			let items = range.split('+').map(x=>parseInt(x));
			return [
				moment(data[data.length-1][0]).add(items[0],'month').add(-items[1],'month').format('YYYY-MM'),
				moment(data[data.length-1][0]).add(items[0],'month').format('YYYY-MM')
			]
		}else{
			return [data[data.length-1][0].slice(0,4)];
			
		}
	}

	render_daily_value(container,daily,title,drop_zero=true,range='years'){
		let data = []
		for(let k in daily){
			data.push([k,daily[k]])
		}
		if(drop_zero){
			data = data.filter(x=>x[1]!=0)
		}
		range = this.get_range(data,range);
		console.log(range)
		let vmax = Math.max(...data.map(x=>x[1]));
		vmax = 5*(Math.floor(vmax/5)+1);
		const options = {
		  width:800,
		  height: 250,
		  title: {
			top: 30,
			left: 'center',
			text: `${title}`
		  },
		  tooltip: {},
		  visualMap: {
			min: 0,
			max: vmax,
			orient: 'horizontal',
			left: 'center',
			top: 65,
			show:false
		  },
		  calendar: {
			top: 120,
			left: 30,
			right: 30,
			cellSize: ['auto', 13],
			range: range,
			dayLabel: { nameMap: 'cn' }, 
			monthLabel: { nameMap: 'cn' },
			itemStyle: {
			  borderWidth: 0.5
			},
			yearLabel: { show: false }
		  },
		  series: {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: data
		  }
		};
		let chartInstance = this.echarts.render(options, container);
		return options
	}
}
if(app.tpl){
	app.tpl.HeatmapCalendar = HeatmapCalendar
}else{
	app.tpl = {
		HeatmapCalendar: HeatmapCalendar
	}
}
```

