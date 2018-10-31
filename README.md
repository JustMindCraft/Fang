## Fang[尖牙]

#### 这里是master分支

master节点将重点研究 leveldb 和 webtorrent分布式问题，其期待是本软件能够在浏览器和各个其他平台作为节点运行

### 本框架旨在解决nodejs开发中，知识和资源成本负担的问题

这是一个面对大众的项目，现在开始用容易理解方式处理业务吧

受到rails　和　laravel的启发，我们需要一款能够尽量降低学习成本的nodejs框架，　听说sails 干得不错，　但是其基于express.js，　express不能解决开发过程中复杂规划的问题，　但是hapi能。

在听取多方意见后，我们渐渐意识到，很多所谓最佳实践可能是没有必要的：在平民的企业中，类似thinkphp这样的一把没有保险栓的左轮手枪可能更受牛仔们的欢迎。


**于是我们的基于hapi.js开发本框架**

### 各个分支版本的说明

我们决定根据数据库去发行不同的软件包，不去做兼容各个数据的事情
1. mongodb 使用原生官方的mongodb driver 稳定版本将会在mongo分支上
2. web 此处是 fang.justmindcraft.co 官方网站，　前端基于semanticUI
3. mongodb-vue-shop　是基于mongodb, vue作为前端的电商系统示例
4. mongodb-react-shop　是基于mongodb, react作为前端的电商系统示例
5. mongodb-react-native-shop　是基于mongodb, react-native作为前端的电商系统示例
6. master节点将重点研究 lokijs 和 webtorrent分布式问题，其期待是本软件能够在浏览器和各个其他平台作为节点运行
7. pgsql 稳定版本将会发布在pgsql 上
8. mysql 稳定版本将会发布在mysql 上
9. levelDB 稳定版本将会发布在leveldb 上
10. movies 分支是基于　leveldb 和 webtorrent的视频点播网站
11. gunjs　稳定版本将会发布在gunjs 上

**需要注意的是**

leveldb和gunjs 是分布式的架构，　用于打包设备原生应用作为节点，而并非web中心化服务。　如果不理解或者没有这方面经验，　个人开发者将面对资源成本问题的时候会自然想到这些的。但是启动一个单个服务节点应用的简单应用，可能leveldb或者gunjs是最快的方式.



* 快速开始
* 了解主要特性
    * 经典易懂的mvc
    * 快速的文档和标准化
    * api生成器
    * 预设的认证机制和基于角色的管理系统
    * 本地化认证
    * 提供电商，博客，公司官网等示例可供快速启动您的项目
    * 区块链和分布式网络支持
    * 种子播放器
    * 内置的ACL管理

* 指南
    * 如何开始？
    * 如何部署？
    * 如何测试？
    * 一个博客系统的示例教程
    * 用户认证入门到精通
* API文档

