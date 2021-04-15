var GitHub = require('github-api');
const { Octokit } = require("@octokit/core");


async function exec(requestToken, repoName,) {

    // basic auth
    var gh = new GitHub({
        token: requestToken
    });
    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    var profile = await me.getProfile()
    const octokit = new Octokit({ auth: requestToken });

    var data = await octokit.request('GET /repos/{owner}/{repo}/zipball/{ref}', {
        owner: profile.data.login,
        repo: repoName,
        ref: "",
    })
    console.log("octokit--data", data);
    return  Buffer.from(data.data)

}
exports.exec = exec