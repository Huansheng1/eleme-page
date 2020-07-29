#!/usr/bin/env sh
# 执行该文件，bash build.sh，该脚本的用处是项目打包并部署到git仓库静态页
# 终止一个错误
set -e
echo '开始执行命令'
npm run build
# read -p "输入本次是否打包: " isBuild  #提示用户输入
# if [ -z $stringDesc ];then             #判断用户是否输入，如果未输入则自动构建
#   stringDesc='True'
# fi
# echo '当前获取是否构建的值：' + $str
# if [[ $str == T* ]]; # 如果以T开头则打包
# then
#  echo '开始打包'
# #  npm run build
# fi
#如果文件夹不存在，创建文件夹
if [ ! -d "build-git" ];then
  echo "build-git文件夹不存在，开始创建……"
  mkdir 'build-git'
fi
echo "执行命令，进入build-git备份git分支gh-pages文件夹"
cd build-git
if [ ! -d ".git" ];then
  echo "build-git/.git文件夹不存在"
  git init
  git checkout --orphan gh-pages
  git remote add origin git@github.com:Huansheng1/eleme-page.git
fi
echo "build-git/.git文件夹存在"
echo "执行命令，复制备份git分支gh-pages文件夹到dist文件夹"
cp -r .git ../eleme-page
# if [ ! -d ".CNAME" ];then
#   echo '执行命令：复制CNAME到打包后的目录'
#   cp -r CNAME ../eleme-page
# fi
cd ..
echo '当前路径：'+ $(cd "$(dirname "$0")";pwd)
# 进入生成的构建文件夹
echo "执行命令，进入生成的构建文件夹"
cd ./eleme-page
echo "执行命令，add所有到暂存区"
git add -A
echo "执行命令，commit到本地仓库"

read -p "输入本次更新推送的描述信息: " stringDesc  #提示用户输入
if [ -z $stringDesc ];then             #判断用户是否输入，如果未输入则打印error
  stringDesc='auto-deploy'
fi

git commit -m $stringDesc
echo "执行命令，push到静态分支"
git push -f origin gh-pages
echo "执行备份命令，备份git分支gh-pages的.git文件夹到build-git文件夹"
echo '当前路径：'+ $(cd "$(dirname "$0")";pwd)
cp -arf .git ../build-git
# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
echo "回到刚才工作目录"
cd -
echo '脚本执行完毕，当前路径：'+ $(cd "$(dirname "$0")";pwd)