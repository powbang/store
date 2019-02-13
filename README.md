git使用

#创建本地仓储： 当前项目根目录下运行命令： git init 
#生成 .git 文件夹

#展示文件状态（是否被提交或跟踪）： git status

#文件添加跟踪命令： git add .
#将所有文件放入仓储区中
#再运行 git status 命令得知 还没有被提交

#提交文件命令： git commit -m "init my project"
#得到提交成功的提示
#git status 上传本地仓储返回结果

#git remote add origin + 远程仓库地址 //链接远程仓库，创建主分支
#git pull origin master // 把本地仓库的变化连接到远程仓库主分支
#git push -u origin master //把本地仓库的文件推送到远程仓库
