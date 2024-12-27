---
PrevNote: "[[Files - 附件分类存放]]"
words:
  2024-12-26: 353
---

这两天碰到一个奇葩的需求：

项目中有一系列任务，每个任务单独用一个笔记跟踪，在元数据中定义了 owner 属性，为每个任务负责人的名字。

后来我想查看每个人有哪些任务，一个简单的办法创建人物笔记，通过双链查看有哪些任务。

我不禁想到之前做概念卡片时，有些概念的关联属性也是用元数据定义的。但属性值又不一开始就是链接，因为我并不确定之后它会不会发展成笔记。

so，能不能遍历元数据中的每个属性值呢？如果值为某篇笔记的名称，将它替换成链接！

说干就干！

执行下面的脚本，会遍历所有的属性值，如果是笔记的话，就替换成链接。脚本的应用对象是选中的笔记或当前笔记。

```js //templater
let nc = app.plugins.plugins['note-chain']
let yamljs = await nc.utils.get_str_func(app,'cJS.YamlJS')
await yamljs.mapping_str_to_link(app,/.*/)
```

例如有笔记 test01.md，另一篇笔记中定义了元数据：

```yaml
link: test01
```

执行之后，元数据变为：

```yaml
link: "[[test01]]"
```

这个可以很方便使用在人物关系图中，更方便地拓展笔记间的关系。

[Obsidian笔记中的人物关系太乱怎么办？ #notechain](https://mp.weixin.qq.com/s/J-NIvujvCVOqVb_MtzO6CQ)


