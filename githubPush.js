var GitHub = require('github-api');
async function exec(requestToken, repoName, fileName, content, encode) {

    var gh = new GitHub({
        token: requestToken
    });

    var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
    var profile = await me.getProfile()
    var repo = gh.getRepo(profile.data.login, repoName)
    console.log(repo);
    var re = await repo.writeFile(
        "master",
        fileName,
        content,
        "test commit",
        {
            encode: encode
        }

    );
    console.log(re);

    var content = await repo.getContents("master", fileName, true)
    console.log(content);
    return re.data



}
exports.exec = exec