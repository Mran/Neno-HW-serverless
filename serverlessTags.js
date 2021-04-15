var mongodb = require("mongodb")

async function exec(client,body, url = "") {

    
    var db = client.db("flomo");
    var collection = db.collection("neno");


    var pipeline = [
        {
            "$match": {}
        },
        {
            "$unwind": {
                "path": "$tags"
            }
        },
        {
            "$group": {
                "_id": "$tags"
            }
        }
    ];

    var cursor = collection.aggregate(pipeline);
    let resultArray = await cursor.toArray()
    let tagsList = []
    resultArray.forEach(element => {
        tagsList = [...tagsList, element._id]
    });
    
    return {
        code: 200,
        message: "BIU",
        body: tagsList
    }

}
// module.exports = addNeno;
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



