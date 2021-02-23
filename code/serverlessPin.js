var mongodb = require("mongodb")

async function exec(body, url = "") {

    let client = await mongodb.MongoClient.connect(url);
    var db = client.db("flomo");
    var collection = db.collection("neno_pin_tags");
    let tag = body.tag
    let oldtag = await collection.findOne({ "tag": tag })
    console.log(oldtag);
    if (oldtag == null) {
        let newtag = { "tag": tag, }
        let result = await collection.insertOne(newtag)
        client.close()
        return {
            code: 200,
            message: "置顶成功",
            body: newtag
        }
    } else {
        await collection.deleteOne({ "tag": tag, })
        client.close()
        return {
            code: 200,
            message: "取消置顶",
            body: oldtag
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



