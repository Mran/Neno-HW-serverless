var GitHub = require('github-api');
async function exec(requestToken, repoName, fileName) {

    // basic auth
    var gh = new GitHub({
        token: requestToken
    });
    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    var profile = await me.getProfile()
    var repo = gh.getRepo(profile.data.login, repoName)

    var content = await repo.listCommits({ path: fileName })
    return content.data



}
exports.exec = exec