var qiniu = require("qiniu")

async function exec(client,body, qiuAK, qiuSK) {
    var options = {
        scope: "fmolo",
        expires: 30
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var accessKey = qiuAK;
    var secretKey = qiuSK;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var uploadToken = putPolicy.uploadToken(mac);
    return {
        code: 200,
        message: "BIU",
        body: uploadToken
    }
}
// module.exports = addNeno;
exports.exec = exec
exports.handler = async (event, context) => {
    let out = {}
    console.log(event.body);
    let qiniuAK = context.getUserData('qiniuAK')
    let qiniuSK = context.getUserData('qiniuSK')

    if (event.body == "") {
        out = await exec({}, qiniuAK, qiniuSK)
    } else {
        let da = JSON.parse(Buffer.from(event.body, 'base64'))

        out = await exec(da, qiniuAK, qiniuSK)
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



