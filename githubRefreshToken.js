var axios = require('axios');
var GitHub = require('github-api');

async function exec(refresToken, clientID = "", clientSecret = "") {

    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${clientID}&` +
            `client_secret=${clientSecret}&` +
            `refresh_token=${refresToken}&` +
            `grant_type=refresh_token`
        ,
        headers: {
            accept: 'application/json'
        }
    })

    var respone = tokenResponse.data
    if (respone.access_token) {
        console.log(respone);

        var gh = new GitHub({
            token: respone.access_token
        });

        var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
        var profile = await me.getProfile()
        console.log(profile.data);
        respone.githubName = profile.data.login
    }
    return respone

}
exports.exec = exec
