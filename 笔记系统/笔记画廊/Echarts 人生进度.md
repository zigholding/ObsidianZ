---
PrevNote: "[[笔记画廊]]"
NextNote: "[[ECharts 每日编辑字数热力图日历]]"
birthday: 2000-01-01
words:
  2025-06-04: 417
  2025-06-05: 397
---

```dataviewjs
function datetime2date(t){
	let year = t.year.toString();
	let month = t.month.toString().padStart(2, '0');
	let day = t.day.toString().padStart(2, '0');
	let formattedTime = `${year}-${month}-${day}`;
	let t0 = new Date(formattedTime);
	return t0;
}

function get_bday(){
	let r = app.plugins.getPlugin("recent-files-obsidian");
	for(let k of r.data.recentFiles){
		let page = dv.index.pages.get(k.path);
		if(page?.frontmatter?.birthday){
			return page;
		}
	}
	return null;
}

let ylife = 80;
let mlife = 5;

let page = get_bday();
if(page){
	let bday = new Date(page.frontmatter.birthday);
	let t1 = new Date(`${1900+bday.getYear()}-01-01`);
	let curr = new Date();
	let t2 = new Date(`${1900+curr.getYear()}-01-01`);
	let data = [];
	let years = [];
	let items = Array.from({length: 52}, (_, index) => index);

	let offset1 = Math.ceil((bday-t1)/86400000/7);
	let offset2 = Math.ceil((curr-t2)/86400000/7);
	
	if(curr-bday>0){
		let y = 1990;

		// 第一年
		years.push(1900+bday.getYear());
		for(let i in items){
			if(i<offset1){
				data.push([i,1900+bday.getYear(),"-"]);
			}else{
				if(bday.getYear()<curr.getYear()){
					data.push([i,1900+bday.getYear(),1]);
				}else{
					if(i<offset2){
						data.push([i,1900+bday.getYear(),1]);
					}else{
						data.push([i,1900+bday.getYear(),0]);
					}
				}
				
			}
		}
		
		for(let y=bday.getYear()+1;y<curr.getYear();y++){
			years.push(1900+y);
			for(let i of items){
				data.push([i,1900+y,1]);
			}
		}
		
		if(curr.getYear()!=bday.getYear()){
			years.push(1990+curr.getYear());
			for(let i in items){
				if(i>offset2){
					data.push([i,1900+curr.getYear(),0]);
				}else{
					data.push([i,1900+curr.getYear(),1]);
				}
			}
		}
		
		
		let ylife2 = Math.max(ylife,curr.getYear()-bday.getYear()+mlife);
		for(let y=curr.getYear()+1;y<bday.getYear()+ylife2;y++){
			years.push(1900+y);
			for(let i of items){
				data.push([i,1900+y,0]);
			}
		}

		// 最后一年
		y = 1900+curr.getYear()+ylife2;
		years.push(y);
		for(let i in items){
			if(i<offset1){
				data.push([i,y,0]);
			}else{
				data.push([i,y,"-"]);
			}
		}

	let bname = app.vault.fileMap[page.path].basename;
	let option = {
	  title: {
		  text: `${bname}@${page.frontmatter.birthday}`
	 },
	  tooltip: {
	    show : false,
	    position: 'top'
	  },
	  grid: {
	    height: '80%',
	    width: '52%'
	  },
	  xAxis: {
		show : false,
	    type: 'category',
	    data: items,
	    splitArea: {
	      show: false
	    }
	  },
	  yAxis: {
	    show : false,
	    type: 'category',
	    inverse : true,
	    splitArea: {
	      show: false
	    }
	  },
	  visualMap: { 
	    min: 0,
	    max: 1,
	    show : false
	  },
	  series: [
	    {
	      name: 'Punch Card',
	      type: 'heatmap',
	      data: data,
	      label: {
	        show: false
	      },
	      itemStyle:{
		      borderWidth:0
	      }
	    }
	  ]
	};
	app.plugins.plugins['obsidian-echarts'].render(option, this.container)

	}
}

```

