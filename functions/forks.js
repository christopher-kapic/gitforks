const fetch = require('node-fetch');

const GITHUB_KEY = process.env.GITHUB_KEY;
const UPSTASH_PORT = process.env.UPSTASH_PORT;
const UPSTASH_UN = process.env.UPSTASH_UN;
const UPSTASH_PW = process.env.UPSTASH_PW;


exports.handler = async(event, context) => {
    const body = JSON.parse(event.body)
    const user = body.user
    const repo = body.repo

    console.log(user, repo)
    const repo_res = await fetch(`https://api.github.com/repos/${user}/${repo}/forks`)
    const repo_json = await repo_res.json();

    return {
        statusCode: 200,
        body: JSON.stringify(repo_json)
    }

}