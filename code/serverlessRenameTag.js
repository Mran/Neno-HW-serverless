var mongodb = require("mongodb")

async function exec(client,body, url = "") {

    if (body.newTag == undefined || body.oldTag == undefined) {
        return {
            code: 400,
            message: "参数不对劲儿",
            body: {}
        }
    }
    var BSONRegExp = mongodb.BSONRegExp;
    var query = {}
    query.tags = new BSONRegExp(`.*${body.oldTag}.*`, "i")

    
    var db = client.db("flomo");
    var collection = db.collection("neno");
    var result = collection.find(query, { sort: [["created_at", -1.0]] });
    let resultArray = await result.toArray()

    for (let index = 0; index < resultArray.length; index++) {
        let element = resultArray[index];
        let rawContent = element.content
        let pIndex = 0;
        let pContent = ""
        for (let tindex = 0; tindex < element.tags.length; tindex++) {
            let rawtag = element.tags[tindex];

            if (rawtag == body.oldTag) {
                let breakIndex = rawContent.indexOf(rawtag);

                element.tags[tindex] = body.newTag
                //截取前段的字符
                pContent += rawContent.substring(0, breakIndex);
                //加上替换的内容
                pContent += body.newTag
                pIndex += breakIndex + body.oldTag.length;
                rawContent = rawContent.substring(breakIndex + body.oldTag.length);

            } else {
                let breakIndex = rawContent.indexOf(rawtag);
                pContent += rawContent.substring(0, breakIndex + rawtag.length);

                rawContent = rawContent.substring(breakIndex + rawtag.length);
                pIndex += breakIndex + rawtag.length;

            }
        }
        pContent += element.content.substring(pIndex);
        element.content = pContent
        await collection.findOneAndReplace({ "_id": element._id }, element)
    }

    
    return {
        code: 200,
        message: "BIU",
        body: {}
    }
}
exports.exec = exec

exports.handler = async (event, context) => {
    let out = {}
    console.log(event, event.body);
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



