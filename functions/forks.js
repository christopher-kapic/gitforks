const fetch = require('node-fetch');
const { Octokit, App, Action } = require("octokit");
const GITHUB_KEY = process.env.GITHUB_KEY;
const octokit = new Octokit({ auth: GITHUB_KEY })

const UPSTASH_PORT = process.env.UPSTASH_PORT;
const UPSTASH_UN = process.env.UPSTASH_UN;
const UPSTASH_PW = process.env.UPSTASH_PW;


exports.handler = async(event, context) => {
    const body = JSON.parse(event.body)
    const user = body.user
    const repo = body.repo

    // const repo_res = await fetch(`https://api.github.com/repos/${user}/${repo}/forks`)
    const repo_json = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: user,
        repo: repo,
    })
    // const repo_json = await repo_res.json();
    console.log(repo_json)

    let forks = []

    repo_json.forEach((fork) => {
        const fork_res = await fetch(`https://api.github.com/repos/${pulluser}/Stocksera/compare/${headuser}:master...master`)
        const fork_json = await fork_res.json();
        forks.push(fork_json)
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            forks: forks
        })
    }

}