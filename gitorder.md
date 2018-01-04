## 【git 命令：】

## 安装Git
#   Linux   : 
#*       Debian/Ubuntu ：
*           $ apt-get install libcurl4-gnutls-dev libexpat1-dev gettext\libz-dev libssl-dev
*           $ apt-get install git-core
*           $ git --version
*           git version 1.8.1.2

#*       Centos/RedHat ： 
*           $ yum install curl-devel expat-devel gettext-devel \openssl-devel zlib-devel
*           $ yum -y install git-core
*           $ git --version
*           git version 1.7.1

#   Windows : 推荐使用git for windows，它包括了图形工具以及命令行模拟器。


## 配置Git
#   设置用户名、邮箱
*   $ git config --global user.name "My Name"
*   $ git config --global user.email "dengfei@flygame.cn"
#   查看已有的配置信息： $ git config --list
#   查看用户名和邮箱地址：
*   $ git config user.name
*   $ git config user.email

## 用ssh-keygen命令生成一组新的id_rsa_new和id_rsa_new.pub
#   ssh-keygen -t rsa -C "dengfei@flygame.cn"

## 创建新仓库：$ git init
#    git 会把所有文件以及历史记录保存在你的项目中，创建一个新的仓库，首先要去到项目路径，执行 git init。然后git会创建一个隐藏的文件夹#    .git，所有的信息都储存在其中。如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用ls -ah命令就可以看见

*   $ git init 
*   $ git init newrepo

*   $ git add *.c
*   $ git add README
*   $ git commit -m '初始化项目版本'
*   以上命令将目录下以 .c 结尾及 README 文件提交到仓库中、或者$ git add -A提交所有文件。

## 检查状态： $ git status
*   $ git status 是另一个非常重要的命令，它会告诉我们仓库的当前状态：是否为最新代码，有什么更新等等执行git status:

## 暂存： $ git add
*   git 有个概念叫 暂存区,包裹着所有你可能会提交的变动。它一开始为空，你可以通过 git add 命令添加内容，并使用 git commit 提交。
*   $ git add *.c // 将目录下以 .c后缀文件提交到暂存区
*   $ git add -A  // 提交所有文件提交到暂存区

## 提交： $ git commit 
*   一次提交代表着我们的仓库到了一个交付状态，通常是完成了某一块小功能。它就像是一个快照，允许我们像使用时光机一样回到旧时光。  
*   $ git commit -m "Initial commit."  
*   -m “Initial commit.”表示对这次提交的描述，建议使用有意义的描述性信息。

## 远程仓库：$ git remote add
#   1：链接远程仓库
*   为了能够上传到远端仓库，我们需要先建立起链接,
*   例：
*   $ git remote add origin git@github.com:dfce/react-stack-learn.git

#   2：上传到服务器： $ git push
*   git push命令会有两个参数，远端仓库的名字，以及分支的名字：
*   $ git push origin master

#   3： 克隆仓库： $ git clone
*   $ git clone git@github.com:dfce/react-stack-learn.git

#   4： 从服务器拉取文件： $ git pull
*   $ git pull origin master

## 分支
#   1：创建分支： $ git branch
*   $ git branch amazing_new_feature

#   2：切换分支： $ git checkout
*   $ git branch    // 单独使用 git branch 可以查看分支状态
*   $ git checkout amazing_new_feature

#   3：合并分支： $ git merge
*   $ git merge amazing_new_feature

## $ git log 每次提交都有一个唯一id，查看所有提交和他们的id，可以使用 git log:

## $ git show commitid 查看某一次提交【commintid】更新了什么

## $ git diff 查看两次提交的不同，可以使用git diff [commit-from]..[commit-to] 
*   比较首次提交和最后一次提交，我们可以看到所有的更改。当然使用git difftool命令更加方便。

## 回滚： $ git checkout
*   下面的例子，我们将hello.txt回滚到最初的状态，需要指定回滚到哪个提交，以及文件的全路径。
*   $ git checkout 09bd8cc1 hello.txt

## 回滚提交： 如果你发现最新的一次提交完了加某个文件，你可以通过 git commit —amend来修复，它会把最新的提交打回暂存区，并尝试重新提交。
#   如果是更复杂的情况，比如不是最新的提交了。那你可以使用git revert。
#*  最新的一次提交别名也叫HEAD。
*   $ git revert HEAD
#*  其他提交可以使用id:
*   $  git revert b10cc123 