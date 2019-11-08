## 自动部署GitHub

- 根目录新建一个sh可执行文件（deploy.sh）
    ``` sh
    # deploy.sh
    npx vuepress build docs

    cd docs/.vuepress/dist

    git init
    git add -A
    git commit -m "deploy"

    git push -f git@github.com:Tosn/Tosn.github.io.git master
    # github目录可以参考建立github项目是ssh路径
    ```
- package.json 新建一条运行命令"sh": "bash deploy.sh"
    ``` js
    // 运行方式
    1、用gitbash打开项目目录 运行 package.json里面的命令，如 npm run dev
    2、直接找到sh文件双击运行
    /* 
    运行过程中提交github失败，需要生成一个key
    命令是：ssh-keygen -t rsa
    会生成一个 id-rsa 和 id-rsa.pub 文件
    打开github > settings > SSH and GPG keys
    添加一个SSH key  new SSH Key
    标题自定义  key为之前生成id-rsa.pub的内容
    在运行之前的命令即可自动打包上传 
    */
    ```

参考文献：
1、[VuePress + github pages + Travis CI 教程](https://www.jianshu.com/p/a7435b8bc8bc)

2、[windows下github 出现Permission denied (publickey).解决方法](https://www.cnblogs.com/eoooxy/p/6075625.html)