
[github](https://github.com/zigholding/ObsidianZ) | [gitee](https://gitee.com/zigholding/ObsidianZ.git)

## 将示例库添加到自己的库里？

### 下载示例库

从官网（https://git-scm.com）下载安装 git：

![Pasted image 20241211193016.png](./__files__/Pasted%20image%2020241211193016.png)

安装成功后，搜索并运行 `Git Bash` ：

![Pasted image 20241211193118.png](./__files__/Pasted%20image%2020241211193118.png)

在弹出窗口，通过 `cd` 命令切换到存放示例库的文件夹，然后通过 `git clone` 下载示例库：
- `github`：`git clone https://github.com/zigholding/ObsidianZ.git`
- `gitee`：`git clone https://gitee.com/zigholding/ObsidianZ.git`

可以看到，目录下多了一个 `ObsidianZ`文件夹。再用 Obsidian 打开示例库即可。

![Pasted image 20241211193545.png](./__files__/Pasted%20image%2020241211193545.png)

如果==示例库有更新==，切换到示例库下，运行 `git pull origin master` 即可。

完整的截图如下所示：

![Pasted image 20241211193618.png](./__files__/Pasted%20image%2020241211193618.png)

### 使用 `VaultExpoter` 同步

接下来，你就可以使用 `VaultExpoter` 将对你有用的笔记和插件，导致自己的库中。

在文件列表中，右键点击 `__scripts__` 文件夹，选择 `Mirror to other vault`，在弹窗中输入自己库的路径：


![Pasted image 20241201201310.png](./__files__/Pasted%20image%2020241201201310.png)

点击确认后，文件夹下的文件，以及笔记所含附件，都会复制到目标库中。

![Pasted image 20241201202235.png](./__files__/Pasted%20image%2020241201202235.png)

插件可以通过 `Vault Exporter: Export plugin`，选择要导入的插件，在弹窗中输入导入的插件路径。

![Pasted image 20241201202436.png](./__files__/Pasted%20image%2020241201202436.png)

更常用的，可以将目录路径添加到设置项中，有多个目录路径时用换行分割。

![Pasted image 20241201202649.png](./__files__/Pasted%20image%2020241201202649.png)

## 示例

[[示例：通过 ModalOpener 实现富文本输入框]]
[[示例：通过 ModalOpener 编辑笔记块]]


更多内容，关注[Obsidian合集@知更鸟在屋顶](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI5MzMxMTU1OQ==&action=getalbum&album_id=3677572515146301446&scene=173&subscene=&sessionid=svr_c2c428d707b&enterid=1732711508&from_msgid=2247488384&from_itemidx=1&count=3&nolastread=1#wechat_redirect)

![Pasted image 20241201203516.png](./__files__/Pasted%20image%2020241201203516.png)