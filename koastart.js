var add = require("./serverlessAdd")
var find = require("./serverlessFind")
var findOne = require("./serverlessDetail")
var deleteOne = require("./serverlessDelete")
var tags = require("./serverlessTags")
var pin = require("./serverlessPin")
var pins = require("./serverlessPins")
var search = require("./serverlessSearch")
var qiniu = require("./serverlessQiNiu")
var setting = require("./serverlessSetting")
var count = require("./serverlessCount")
var rename = require("./serverlessRenameTag")
var githubLogin = require("./githubLogin")
var githubPush = require("./githubPush")
var githubFetch = require("./githubFetch")
var githubLastCommit = require("./githubLastCommit")
var githubCreateRepo = require("./githubCreateRepo")

var githubRefreshToken = require("./githubRefreshToken")
var githubGetApp = require("./githubGetApp")
var githubCompareCommit = require("./githubCompareCommit")
var githubGetZipAchrive = require("./githubGetZipAchrive")

var mongodb = require("mongodb")

var mongoConfig = require("./mongoconfig")
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const cors = require('koa2-cors');
var Router = require('koa-router');
const url = mongoConfig.mongoUrl
const app = new Koa();
let client = ""
async function initClient(params) {
    client = await mongodb.MongoClient.connect(url);
}
initClient()
app.use(
    cors({
        origin: function (ctx) {
            if (ctx.url === '/test') {
                return true; // 允许来自所有域名请求
            }
            return '*';
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
app.use(bodyParser());

var router = new Router();

router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World111!';
});
router.post('/addNeno', async (ctx, next) => {
    ctx.body = await add.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/find', async (ctx, next) => {
    ctx.body = await find.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/detail', async (ctx, next) => {
    ctx.body = await findOne.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/delete', async (ctx, next) => {
    ctx.body = await deleteOne.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/tags', async (ctx, next) => {
    ctx.body = await tags.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/pin', async (ctx, next) => {
    ctx.body = await pin.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/pins', async (ctx, next) => {
    ctx.body = await pins.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/search', async (ctx, next) => {
    ctx.body = await search.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/qiniu', async (ctx, next) => {
    ctx.body = await qiniu.exec(client, ctx.request.body, mongoConfig.qiniuAK, mongoConfig.qiniuSK);
    console.log(ctx.body);

});
router.post('/setting', async (ctx, next) => {
    ctx.body = await setting.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/count', async (ctx, next) => {
    ctx.body = await count.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/rename', async (ctx, next) => {
    ctx.body = await rename.exec(client, ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/githubLogin', async (ctx, next) => {
    ctx.body = await githubLogin.exec(ctx.request.body.code, mongoConfig.clientID, mongoConfig.clientSecret);
    console.log(
        ctx.body);

});
router.post('/githubRefreshToken', async (ctx, next) => {
    ctx.body = await githubRefreshToken.exec(ctx.request.body.refresToken, mongoConfig.clientID, mongoConfig.clientSecret);
    console.log(
        ctx.body);

});
router.post('/githubPush', async (ctx, next) => {
    ctx.body = await githubPush.exec(ctx.request.body.token, ctx.request.body.repoName, ctx.request.body.fileName, ctx.request.body.content, ctx.request.body.encode);
    console.log(ctx.body);

});
router.post('/githubFetch', async (ctx, next) => {
    ctx.body = await githubFetch.exec(ctx.request.body.token, ctx.request.body.repoName, ctx.request.body.fileName,ctx.request.body.raw);
    console.log(ctx.body);

});
router.post('/githubLastCommit', async (ctx, next) => {
    ctx.body = await githubLastCommit.exec(ctx.request.body.token, ctx.request.body.repoName, ctx.request.body.fileName);
    console.log(ctx.body);

});
router.post('/githubCreateRepo', async (ctx, next) => {
    ctx.body = await githubCreateRepo.exec(ctx.request.body.token, ctx.request.body.repoName);
    console.log(ctx.body);

});
router.post('/githubGetApp', async (ctx, next) => {
    ctx.body = await githubGetApp.exec(ctx.request.body.token, mongoConfig.clientID, mongoConfig.clientSecret);
    console.log(
        ctx.body);
});
router.post('/githubCompareCommit', async (ctx, next) => {
    ctx.body = await githubCompareCommit.exec(ctx.request.body.token, ctx.request.body.repoName, ctx.request.body.baseCommit, ctx.request.body.heaedCommit,);
    console.log(
        ctx.body);
});
router.post('/githubGetZipAchrive', async (ctx, next) => {
    ctx.body = await githubGetZipAchrive.exec(ctx.request.body.token, ctx.request.body.repoName);
    ctx.response.set("content-type", "text/html;charset=utf-8");
    // const buf = Buffer.alloc(1024);
// ctx.body = buf;
    console.log(
        ctx.body);
});


app
    .use(router.routes())
    .use(router.allowedMethods());
console.log("app.listen(3000);");
app.listen(3000);
