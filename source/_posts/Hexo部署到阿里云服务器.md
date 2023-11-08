---
title: Hexo部署到阿里云服务器
date: 2023-11-03 14:16:36
tags: hexo
categories: 博客搭建
description: 使用宝塔面板将 hexo 部署到阿里云服务器上
swiper_index: 5 #置顶轮播图顺序，非负整数，数字越大越靠前
---

# 将 hexo 部署到云服务器上

## 1.前提
1.已经搭建好hexo的相关环境
2.已经购买好云服务器
3.已经购买并备案好域名(没有也可以直接使用IP地址访问hexo)

## 2.通过xshell远程连接上阿里云服务器
这个和虚拟机的连接基本一致，直接通过云服务器的公网IP连接。
![](/img/xshell.png)

## 3.安装宝塔面板
Centos安装脚本

```
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

Ubuntu安装脚本
```
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

一路确认即可，之后登录宝塔面板(必须在云服务器的防护墙添加宝塔端口规则)

<img src="/img/宝塔端口.png">

可以点添加站点，然后将自己申请的域名绑定上。

<img src="/img/宝塔域名.png">

现在网站开头还是http，会被标记为不安全，需要配置SSL

<img src="/img/宝塔SSL1.png">

选择域名，点击申请，成功后点击强制https

<img src="/img/宝塔SSL2.png">

之后还需要将安全页面的443端口重新删除之后在添加一遍

## 4.安装并配置git仓库

安装git (服务器上)
```
yum install git
```

配置git用户
```
adduser git
```

改写权限
```
chmod 740 /etc/sudoers
```

权限配置
```
vi /etc/sudoers
```

在root下添加以下信息
```
git     ALL=(ALL)       ALL
```

改回权限
```
chmod 400 /etc/sudoers
```

设置git账号的密码
```
sudo passwd git
```

切换git用户
```
su git
```

创建.ssh文件夹
```
mkdir -p ~/.ssh
```

创建并编辑authorized_keys文件，将本地git的ssh秘钥复制进去，一般本地电脑的ssh秘钥都在C:\Users\lenovo\.ssh\id_rsa.pub文件中。如果没有可以按照下面的方法生成秘钥。
```
mkdir -p ~/.ssh

```

在本地电脑的hexo文件的根目录下打开git bush，执行一下命令生成秘钥
```
ssh-keygen -t rsa -C 邮箱
```

赋予权限
```
chmod 600 /home/git/.ssh/authorized_keys
```

测试本地电脑连接云服务器
```
ssh -v git@ip地址
```

## 5.创建git仓库

切换到root用户
```
su root
```

创建用于存储存储网站的根目录
```
mkdir /home/hexo
```

赋予权限
```
chown git:git -R /home/hexo
chomd go+w /home/hexo //这一步很关键，不然hexo文件夹没有写入权限，会报错
```

新建并初始化一个git仓库
```
cd /home/git
git init --bare blog.git
```

修改权限
```
chown git:git -R blog.git

```

在/home/hexo/blog.git下，有一个自动生成的hooks文件夹，我们在该文件夹下新建一个勾子文件post-receive，用于自动部署
```
vim blog.git/hooks/post-receive
```

在文件中添加下面代码，用于指定git执行目录
```
 #!/bin/bash 
 git --work-tree=/home/hexo --git-dir=/home/git/blog.git checkout -f 
```

修改文件权限
```
chmod +x /home/git/blog.git/hooks/post-receive
```

## 6.配置本地Hexo，构建至服务器

打开hexo根目录的_config.yml文件，修改以下配置
```
deploy:
  type: git
  #git@ip地址（或域名）:/仓库地址
  repo: git@xxxx:/home/git/blog.git
  #分支
  branch: master
```

运行hexo根目录下的.bat文件，将hexo部署到云服务器上。