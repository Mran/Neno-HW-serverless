var GitHub = require('github-api');
const { Octokit } = require("@octokit/core");
async function exec(requestToken, repoName, baseCommit, heaedCommit) {

    // basic auth
    var gh = new GitHub({
        token: requestToken
    });
    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    var profile = await me.getProfile()
    var repo = gh.getRepo(profile.data.login, repoName)
    // const octokit = new Octokit({ auth: `${requestToken}` });

    // var data= await octokit.request('GET /repos/{owner}/{repo}/compare/{basehead}', {
    //     owner: profile.data.login,
    //     repo:repoName,
    //     basehead: baseCommit
    //   })
    //   console.log("octokit--data",data);
    var content = await repo.compareBranches(baseCommit, heaedCommit)
    return content.data



}
exports.exec = exec