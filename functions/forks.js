const fetch = require('node-fetch');
const { min } = require("mathjs");
const { Octokit, App, Action } = require("octokit");
const GITHUB_KEY = process.env.GITHUB_KEY;
const GITHUB_KEY_V2 = process.env.GITHUB_KEY_V2;
const octokit = new Octokit({ auth: GITHUB_KEY })

const UPSTASH_PORT = process.env.UPSTASH_PORT;
const UPSTASH_UN = process.env.UPSTASH_UN;
const UPSTASH_PW = process.env.UPSTASH_PW;

const MAX_FORKS = process.env.MAX_FORKS || 40; // 40

exports.handler = async (event, context) => {
    // const body = JSON.parse(event.body)
    const body = event.headers
    const user = body.user
    const repo = body.repo


    const repo_json = await octokit.request("GET /repos/{owner}/{repo}/forks", {
        owner: user,
        repo: repo,
    })

    // console.log(repo_json)
    
    let forks = []
    let n_forks = min(MAX_FORKS, repo_json.data.length)
    for (i = 0; i < n_forks; i++) {
        forks[i] = fetch(`https://api.github.com/repos/${repo_json.data[i].full_name}/compare/${user}:master...master`, {
            headers: {
                authorization: `Basic ${GITHUB_KEY_V2}`
            }
        });
    }
    
//     let forks = repo_json.data.map((fork) => {
//         return(fetch(`https://api.github.com/repos/${fork.full_name}/compare/${user}:master...master`, {
//             headers: {
//                 authorization: `Basic ${GITHUB_KEY_V2}`
//             }
//         }))
//     })

    forks = await Promise.all(forks)

    let forks_json = forks.map((fork) => {
        return(fork.json())
    })

    forks_json = await Promise.all(forks_json)

    console.log(JSON.stringify({
        forks: forks_json,
        user: user,
        repo: repo
    }))

    return {
        statusCode: 200,
        body: JSON.stringify({
            forks: forks_json,
            user: user,
            repo: repo
        })
    }
}
