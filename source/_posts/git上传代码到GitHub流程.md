---
title: git使用上传代码教程
tag: git
categories: 工具
swiper_index: 2 #置顶轮播图顺序，非负整数，数字越大越靠前
---
# git上传代码到GitHub

### 1.创建一个GitHub账号并新建一个仓库

### 2.再要需要上传的代码文件的根目录下打开git bush

### 3.执行git init初始化本地git仓库

### 4.执行git add .将代码和文件夹全部添加到git仓库。也可以使用git add xxx xxx 来添加指定文件和文件夹

### 5.执行git commit -m "xxxxxx", 提交代码和文件夹到本地仓库，并添加信息

### 6.执行git branch -M main将当前分支的名称从master改为main

### 7.执行remote add oringin [GitHub仓库的ssh地址]

### 8.执行git pull --rebase origin main,将远程库中的更新合并到本地库中，不执行这一命令可能会push报错

### 9.执行git push -u origin main，将本地main分支推送到GitHub

