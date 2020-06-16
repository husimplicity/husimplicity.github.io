---
title: 阿尔托莉雅的shell
date: 2020-06-09 18:11:34
tags: 琉璃猫
categories: 小鱼干
---

### 切分数据集

 `ls -l DATA_DIR | awk 'BEGIN{srand();} {printf "%s %s\n", rand(), $0}' | sort -k1n | awk '{gsub($1FS,""); print $0}' | awk '{print $9}' | awk 'FNR<=2000' | xargs -i sudo mv DATA_DIR/{} TEST-DIR/.`

` ls -l DATA_DIR | awk 'BEGIN{srand();} {print rand(), $0}' | sort -k1n | awk '{print $10}' | awk 'FNR<=2000' | xargs -i sudo mv DATA_DIR/{} TEST-DIR/. `【魏武精修版】

<!--more-->

### 杀幽灵的方法

`ps aux | grep "cuda 1" | awk '{print $2}' | xargs kill -9 `

### 批量重命名文件 (注意，不能出现同名否则会覆盖）

`c=0;for i in *.pdf;do mv -f $i $((c+=1)).pdf;done`

### 将图片批量转换为PDF 

`convert *.jpg a.pdf`

### 清理回收站 

`cd ~/.local/share/Trash； sudo su；rm -fr files/*`

### 合并pdf 

`pdftk *.pdf cat output 1.pdf`

### 看文件夹大小 

`sudo du -h --max-depth=1`

### 统计文件个数

` ls -al | wc -l | awk '{print $1 -3}'`

### 自动登录远程主机

在本地运行命令:

`ssh-keygen -t rsa` (连续三次回车,即在本地生成了公钥和私钥,不设置密码)

`ssh xxx@xx.xx.xx.xx "mkdir .ssh" `(需要输入密码)

`scp ~/.ssh/id_rsa.pub xxx@xx.xx.xx.xx:.ssh/id_rsa.pub` (需要输入密码)

在远程机的命令:

`touch /root/.ssh/authorized_keys` (如果已经存在这个文件, 跳过这条)

`cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys` (将id_rsa.pub的内容追加到authorized_keys 中)

回到本地机器:

`ssh xxx@xx.xx.xx.xx` (不需要密码, 登录成功)

### Tmux

在tmux运行然后要退出但是让tmux在后台运行，使用`Ctrl+B d`
要在命令行重新回到tmux，在命令行输入`tmux a`
如果开了多个tmux session，在`tmux a`进入任意的tmux之后，使用`Ctrl+B s`

### Python

根目录：`export PYTHONPATH=pwd:$PYTHONPATH`

访问服务器 Jupyter Notebook
`ssh -L 8000:localhost:8888 xxxx@xx.xx.xx.xx` (8000是本地的port,随便换)

### Git

撤销commit: `git reset --soft HEAD`
批量删除Branch: `git branch | grep -v "master" |xargs git branch -D`
清楚无用Branch: `git remote prune origin`
合并最近4次提交记录 `git rebase -i HEAD~4` (先合并 后提交)s