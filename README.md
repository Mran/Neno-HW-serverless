# neno_hw_serverless

neno 服务端

# 本地部署

### npm install

### 添加文件 mongoconfig.js

写入以下内容,填上自己的数据
**mongodb的数据库名为需neno**
```
//mongodb的链接
exports.mongoUrl = "";
//七牛云的AK
exports.qiniuAK=""
//七牛云的SK
exports.qiniuSK=""

```

### npm run serve


# 华为云Serverless部署

### 注册华为云账号

[注册地址](https://reg.huaweicloud.com/registerui/cn/register.html?locale=zh-cn&fromacct=231641b2-8072-4608-86a6-2adf99a922d3&utm_source=V1g3MDY4NTY=&utm_medium=cps&utm_campaign=201905)

前往[华为云的函数工作流](https://console.huaweicloud.com/functiongraph/?region=cn-north-4#/serverless/dashboard)也就是serverless服务

### 添加文件 serverless.conf

写入以下内容,填上自己的数据 

```
{
    "mongoUrl": "",
    "qiniuAK": "",
    "qiniuSK": "",
    "HWAK": "",
    "HWSK": "",
    "Enpoint": "",
    "projectId": ""
}

```
**mongoUrl** mongodb 的链接  **mongodb的数据库名为需neno**

**qiniuAK** 七牛云的AK

**qiniuSK** 七牛云的SK

**HWAK** 华为云AK

**HWSK** 华为云SK

**Enpoint** 华为云服务的所在区

 [查看方式](https://console.huaweicloud.com/iam/?region=cn-north-4#/mine/apiCredential)
![如图](http://img.neno.topmini.top/Snipaste_2021-02-24_01-06-20.png)

图中为 cn-north-4

**projectId** 项目ID 图中为"06fa465..." 

### 打开控制台,自动部署
执行 **hw_serverless_dev.exe**

 **hw_serverless_dev.exe**由hw_serverless_dev文件夹下的go代码打包而成.你也可以自行打包.
