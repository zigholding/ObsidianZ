---
words:
  2025-06-22: 789
PrevNote: "[[ObsidianZ]]"
NextNote: 
---


[github](https://github.com/zigholding/ObsidianZ) | [gitee](https://gitee.com/zigholding/ObsidianZ.git)

## 将示例库添加到自己的库里？

### 下载示例库

从官网（https://git-scm.com）下载安装 git：

![](./笔记系统/assets/Pasted%20image%2020241211193016.png)

安装成功后，搜索并运行 `Git Bash` ：

![](./笔记系统/assets/Pasted%20image%2020241211193118.png)

在弹出窗口，通过 `cd` 命令切换到存放示例库的文件夹，然后通过 `git clone` 下载示例库：
- `github`：`git clone https://github.com/zigholding/ObsidianZ.git`
- `gitee`：`git clone https://gitee.com/zigholding/ObsidianZ.git`

可以看到，目录下多了一个 `ObsidianZ`文件夹。再用 Obsidian 打开示例库即可。

![](./笔记系统/assets/Pasted%20image%2020241211193545.png)

如果==示例库有更新==，切换到示例库下，运行 `git pull origin master` 即可。

完整的截图如下所示：

![](./笔记系统/assets/Pasted%20image%2020241211193618.png)

### 使用 `NoteSync` 同步

接下来，你就可以使用 `NoteSync` 将对你有用的笔记和插件，导致自己的库中。

在文件列表中，右键点击 `__scripts__` 文件夹，选择 `Sync to other vault`，在弹窗中输入自己库的路径：

点击确认后，文件夹下的文件，以及笔记所含附件，都会复制到目标库中。

![](./笔记系统/assets/Pasted%20image%2020241201202235.png)

插件可以通过 `Note Sync: Export plugin`，选择要导入的插件，在弹窗中输入导入的插件路径。

![](./笔记系统/assets/Pasted%20image%2020241201202436.png)

更常用的，可以将目录路径添加到设置项中，有多个目录路径时用换行分割。

![](./笔记系统/assets/Pasted%20image%2020241217215234.png)
`Strict mode` 在同步时会删除目标目录中多出来的文件，保证两个目录内的文件是相同的。

### 使用软链接同步

如果使用的库仅在电脑端使用，不需要同步到手机端。

那么使用软链接将是最佳选择！

执行脚本笔记[[使用软链接将示例库添加到目标库]]，选择或输入要同步的目标库，脚本会在控制台打印创建 ObsidianZ 各文件夹的软链接，包括：
- [[__plugins__]]
- [[00 Index]]
- `.obsidian/snippets`：配置文件夹
- `.obsidian/plugins`：各插件的软链接
- 其它文件：community-plugins.json、core-plugins.json、hotkeys.json。如果不想同步这些配置，在代码中删除或注释相应行；

当然，如果你已经添加过软链接，或创建了同名笔记，会跳过创建命令。

![](./笔记系统/assets/Pasted%20image%2020241228092723.png)

所有的命令会复制到剪裁板中，可以到 `cmd` 中粘贴，也可以到控制台中复制需要的插件软链接命令。

![](./笔记系统/assets/Pasted%20image%2020241228093515.png)

执行成功后如下所示：

![](./笔记系统/assets/Pasted%20image%2020241228093450.png)

由于 `windows` 中软链接只能处理文件夹，对于文件的同步，使用 [[Note Sync]] 中的函数复制文件。


## 示例

[[示例：通过 ModalOpener 实现富文本输入框]]
[[示例：通过 ModalOpener 编辑笔记块]]


更多内容，关注[Obsidian合集@知更鸟在屋顶](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI5MzMxMTU1OQ==&action=getalbum&album_id=3677572515146301446&scene=173&subscene=&sessionid=svr_c2c428d707b&enterid=1732711508&from_msgid=2247488384&from_itemidx=1&count=3&nolastread=1#wechat_redirect)

![](./笔记系统/assets/Pasted%20image%2020241201203516.png)