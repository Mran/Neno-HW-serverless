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
   
    let nenoId = mongodb.ObjectId.createFromHexString(body._id)
    var query = { _id: nenoId };
    var result = await collection.findOne(query);

    if (result != undefined) {
        result.parent = null
        result.children = []
        query = { _id: result.parentId };
        let parentResult = await collection.findOne(query);
        if (parentResult != undefined) {
            result.parent = parentResult
        }
        query = { parentId: nenoId };
        let childrenResult = collection.find(query);
        let childrenArray = await childrenResult.toArray()
        for (let index = 0; index < childrenArray.length; index++) {
            let element = childrenArray[index];
            query = { parentId: element._id };
            let subChildrenResult = collection.find(query);
            element.children = await subChildrenResult.toArray()
            console.log(element);
        }
        result.children = childrenArray
    }

    client.close()

    return {
        code: 200,
        message: "BIU",
        body: result == undefined ? {} : result
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



