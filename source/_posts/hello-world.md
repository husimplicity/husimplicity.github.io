---
title: Hello World
date: 2019-01-12 00:00:00
---
# Hexo official start（看看就好）

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

# Quick Start of This Blog

**先安装hexo**

First you need to clone from git.

```
git clone ***.git
```

then checkout branch hexo

```
git checkout hexo
```

you can add a post by

```
hexo new post_name
```

or modify a post by directly modifying the .md in source/_post

then you can preview the modified blog by running on local server

```
hexo s --debug
# on localhost:4000
```

If you want to deploy

```
hexo clean # if delete something
hexo d -g
```

then don't forget to update branch hexo 

```
git add *
git commit -m "why you update"
git push
```

# 阿尔托莉雅的Hexo

## 标题规范

可以不用一级标题开始，但是必须保证级别连续

比如最大的用三级，则下一级是四级

##  文章之间的连接

```
[显示文字](连接地址，从主页后开始写，例如本篇为/2020/01/12/hello-world)
```

## 阅读更多

首页上不显示全部内容

`<!--more-->`

