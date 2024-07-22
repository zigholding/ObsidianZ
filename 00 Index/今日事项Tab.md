---
PrevNote: "[[今日事项4D]]"
NextNote: "[[IDX-目录文件数]]"
ctime: 2024-05-26 13:31
words:
  2024-06-16: 303
---

### Just do it! ✨

```tabs
---tab 今日待办

> [!danger]+ 今日待办
> 
> ```tasks
> not done
> filter by function \
>     let today = moment();\
>     app.xtask = this;\
>     let r = app.plugins.getPlugin("recent-files-obsidian");\
>     let i = 3;\
>     for(let k of r.data.recentFiles){\
>         let bname = k.basename;\
>         if((new Date(bname)).toString().localeCompare('Invalid Date')!=0){\
> 	        today = moment(bname);\
> 	        break;\
> 	    }\
> 	    i = i -1;\
> 	    if(i<0){\
> 	        break;\
> 	    }\
>     }\
>     return task.due.moment?.isSameOrBefore(today) || false;\
> ```

---tab 本周事项

> [!abstract]+ 本周事项
> 
> ```tasks
> not done
> has due date
> filter by function \
>     let today = moment();\
>     let r = app.plugins.getPlugin("recent-files-obsidian");\
>     let i = 3;\
>     for(let k of r.data.recentFiles){\
>         let bname = k.basename;\
>         if((new Date(bname)).toString().localeCompare('Invalid Date')!=0){\
> 	        today = moment(bname);\
> 	        break;\
> 	    }\
> 	    i = i -1;\
> 	    if(i<0){\
> 	        break;\
> 	    }\
>     }\
>     let next = new Date(today.year(),today.month(),today.date());\
>     next.setDate(next.getDate()+8 -next.getDay());\
>     return (task.due.moment?.isAfter(today) && task.due.moment.isBefore(next)) || false;\
> ```

---tab 今日完成

> [!success]+ 今日完成
> 
> ```tasks
> done
> hide start date
> filter by function \
>     let today = moment();\
>     let r = app.plugins.getPlugin("recent-files-obsidian");\
>     let i = 3;\
>     for(let k of r.data.recentFiles){\
>         let bname = k.basename;\
>         if((new Date(bname)).toString().localeCompare('Invalid Date')!=0){\
> 	        today = moment(bname);\
> 	        break;\
> 	    }\
> 	    i = i -1;\
> 	    if(i<0){\
> 	        break;\
> 	    }\
>     }\
>     return task.done.moment?.isSame(today) || false;\
> ```
```

[[今日事项]] --- [[今日事项4D#Just do it! ✨| 今日事项4D]]

