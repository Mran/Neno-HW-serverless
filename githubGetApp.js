var axios = require('axios');
var GitHub = require('github-api');

async function exec(requestToken, clientID = "", clientSecret = "") {

    const tokenResponse = await axios({
        method: 'post',
        url: 'https://api.github.com/user/installations',
        headers: {
            Authorization: `token ${requestToken}`
        }
    })
    console.log(tokenResponse);

    var respone = tokenResponse.data
    return respone

}
exports.exec = exec
