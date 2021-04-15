var mongodb = require("mongodb")

async function exec(client,body, url = "") {

    
    var db = client.db("flomo");
    var collection = db.collection("neno_setting");
    let setting = body
    if (Object.keys(setting).length === 0) {
        let oldSetting = await collection.findOne({})
        if (oldSetting==undefined) {
            oldSetting={}
        }
        
        return {
            code: 200,
            message: "BIU",
            body: oldSetting
        }
    } else {
        try {
            let aa = await collection.findOneAndReplace({}, setting)
            console.log("findOneAndReplace",aa);
            if(aa.value==null){
                throw "neno_setting is empty "
            }

        } catch (error) {
            console.log("error",error);
            await collection.insertOne(setting)

        }
        
        return {
            code: 200,
            message: "BIU",
            body: setting
        }
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



