var axios = require('axios');
var GitHub = require('github-api');

async function exec(requestCode, clientID = "", clientSecret = "") {

    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${clientID}&` +
            `client_secret=${clientSecret}&` +
            `code=${requestCode}`,
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
        const checkInstallations = await axios({
            method: 'get',
            url: 'https://api.github.com/user/installations',
            headers: {
                Authorization: `token ${respone.access_token}`
            }
        })
        var installapp = checkInstallations.data.installations
        var nenoinkId = ""
        var repository_selection = ""

        for (let index = 0; index < installapp.length; index++) {
            const element = installapp[index];
            if (element.app_slug == "nenoink") {
                nenoinkId = element.id
                repository_selection = element.repository_selection
            }

        }
        respone.nenoinkId = nenoinkId
    }
    console.log(respone);

    return respone

}
exports.exec = exec
