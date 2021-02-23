var mongodb = require("mongodb")
var dayjs = require("dayjs");

async function exec(body, url = "") {
    if (body.content == undefined || body.content == "") {
        return {
            code: 400,
            message: "内容不能为空"
        }
    }
    let client = await mongodb.MongoClient.connect(url);
    var db = client.db("neno");
    var collection = db.collection("neno");



    if (body._id != undefined && body._id != "") {
        //更新
        let id = body._id
        delete body._id
        body.update_at = dayjs().format()

        var oldNeno = await collection.findOne({ _id: mongodb.ObjectId.createFromHexString(id) });
        body.created_at = oldNeno.created_at
        if (body.parentId != "") {
            body.parentId = mongodb.ObjectId.createFromHexString(body.parentId)
        }
        var result = await collection.findOneAndReplace({ _id: mongodb.ObjectId.createFromHexString(id) }, body);
        body._id = id
        client.close()
        return {
            code: 200,
            message: "BIU",
            body: body
        }
    } else {
        //新增
        if (body.parentId != undefined && body.parentId != "") {
            body.parentId = mongodb.ObjectId.createFromHexString(body.parentId)

        }
        delete body._id
        body.created_at = dayjs().format()
        var countCollection = db.collection("neno_count");
        let dDate = body.created_at.substring(0, 10)
        let temp = {}
        temp[dDate] = 1
        let update = { "$inc": temp }
        let date = await countCollection.findOneAndUpdate({}, update)
        console.log(date);

        if (date.value == null) {
            await countCollection.insertOne(temp)
        }

        var result = await collection.insertOne(body);
        if (result.acknowledged) {
            let query = { _id: body.parentId };
            let parentResult = await collection.findOne(query);
            body.parent = null
            body.children = []
            if (parentResult != undefined) {
                body.parent = parentResult
                client.close()
            }
            return {
                code: 200,
                message: "BIU",
                body: body
            }
        } else {
            console.log(result);
            client.close()
            return {
                code: 400,
                message: "添加失败",
                body: {}
            }
        }
    }
}
// module.exports = addNeno;
exports.exec = exec
exports.handler = async (event, context) => {
    let out = {}
    console.log(event.body);
    let mongodb_url = context.getUserData('mongodb_url')
    if (event.body == "") {
        out = await exec({}, mongodb_url)
    } else {
        let da = JSON.parse(Buffer.from(event.body, 'base64'))

        out = await exec(da, mongodb_url)
    }

    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': JSON.stringify(out),
    }
    return output;

}



