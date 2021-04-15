var mongodb = require("mongodb")

async function exec(client,body, url = "") {
    
    var db = client.db("flomo");
    var collection = db.collection("neno");
    var BSONRegExp = mongodb.BSONRegExp;
    var query = {}
    if (body.content != undefined && body.content != "") {
        query.content = new BSONRegExp(`.*${body.content}.*`, "i")
    }

    if (body.created_at != undefined && body.created_at != "") {
        query.created_at = new BSONRegExp(`.*${body.created_at}.*`, "i")
    }
    if (body.tag != undefined && body.tag != "") {
        query.tags = new BSONRegExp(`.*${body.tag}.*`, "i")
    }
    if (Object.keys(body).length == 0) {
        return {
            code: 400,
            message: "缺少检索条件",
            body: {}
        }
    }

    var result = collection.find(query, { sort: [["created_at", -1.0]] });
    let resultArray = await result.toArray()
    for (let index = 0; index < resultArray.length; index++) {
        const result = resultArray[index];
        result.children = []
        result.parent = null
        let query = { _id: result.parentId };
        let parentResult = await collection.findOne(query);
        if (parentResult != undefined) {
            result.parent = parentResult
        }
        query = { parentId: result._id };
        let childrenResult = collection.find(query);
        result.children = await childrenResult.toArray()
    }
    
    return {
        code: 200,
        message: "BIU",
        body: resultArray
    }
}
exports.exec = exec

exports.handler = async (event, context) => {
    let out = {}
    console.log(event.body);
    let mongodb_url = context.getUserData('mongodb_url')
let client = await mongodb.MongoClient.connect(mongodb_url);

    if (event.body == "") {
        out = await exec(clientclient,{}, mongodb_url)
    } else {
        let da = JSON.parse(Buffer.from(event.body, 'base64'))
        out = await exec(client,da, mongodb_url)
    }

    client.close()
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



