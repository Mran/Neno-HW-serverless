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


var mongoConfig = require("./mongoconfig")
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const cors = require('koa2-cors');
var Router = require('koa-router');
const url = mongoConfig.mongoUrl
const app = new Koa();
app.use(
    cors({
      
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
    ctx.body = await add.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/find', async (ctx, next) => {
    ctx.body = await find.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/detail', async (ctx, next) => {
    ctx.body = await findOne.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/delete', async (ctx, next) => {
    ctx.body = await deleteOne.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/tags', async (ctx, next) => {
    ctx.body = await tags.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/pin', async (ctx, next) => {
    ctx.body = await pin.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/pins', async (ctx, next) => {
    ctx.body = await pins.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/search', async (ctx, next) => {
    ctx.body = await search.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/qiniu', async (ctx, next) => {
    ctx.body = await qiniu.exec(ctx.request.body, mongoConfig.qiniuAK, mongoConfig.qiniuSK);
    console.log(ctx.body);

});
router.post('/setting', async (ctx, next) => {
    ctx.body = await setting.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/count', async (ctx, next) => {
    ctx.body = await count.exec(ctx.request.body, url);
    console.log(ctx.body);

});
router.post('/rename', async (ctx, next) => {
    ctx.body = await rename.exec(ctx.request.body, url);
    console.log(ctx.body);

});


app
    .use(router.routes())
    .use(router.allowedMethods());
console.log("app.listen(3000);");
app.listen(3000);