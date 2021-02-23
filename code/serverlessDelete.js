var mongodb = require("mongodb")

async function exec(body, url = "") {
    if (body._id == undefined || body._id == "") {
        return {
            code: 400,
            message: "_id不能为空"
        }
    }
    let client = await mongodb.MongoClient.connect(url);
    var db = client.db("flomo");
    var collection = db.collection("neno");

    var oldNeno = await collection.findOne({ _id: mongodb.ObjectId.createFromHexString(body._id) });
    var result = await collection.deleteOne({ _id: mongodb.ObjectId.createFromHexString(body._id) });

    if (result.deletedCount != 0) {
        var deleteCollection = db.collection("neno_delete");
        oldNeno.delete_at = new Date(Date.now()).toISOString()
        var result = await deleteCollection.insertOne(oldNeno);
        client.close()
        return {
            code: 200,
            message: "BIU",
            body: {}
        }
    } else {
        client.close()
        return {
            code: 400,
            message: "删除失败",
            body: {}
        }
    }

}
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



