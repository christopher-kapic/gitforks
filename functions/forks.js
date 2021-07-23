const fetch = require('node-fetch');
const { Octokit, App, Action } = require("octokit");
const GITHUB_KEY = process.env.GITHUB_KEY;
const GITHUB_KEY_V2 = process.env.GITHUB_KEY_V2;
const octokit = new Octokit({ auth: GITHUB_KEY })

const UPSTASH_PORT = process.env.UPSTASH_PORT;
const UPSTASH_UN = process.env.UPSTASH_UN;
const UPSTASH_PW = process.env.UPSTASH_PW;


exports.handler = async (event, context) => {
    const body = JSON.parse(event.body)
    const user = body.user
    const repo = body.repo

    const repo_json = await octokit.request("GET /repos/{owner}/{repo}/forks", {
        owner: user,
        repo: repo,
    })

    let forks = repo_json.data.map((fork) => {
        // return(octokit.request(`GET /repos/{fullname}/compare/{user}:master...master`, {
        //     fullname: fork.full_name,
        //     user: user
        // }))
        return(fetch(`https://api.github.com/repos/${fork.full_name}/compare/${user}:master...master`, {
            headers: {
                authorization: `Basic ${GITHUB_KEY_V2}`
            }
        }))
    })

    forks = await Promise.all(forks)

    let forks_json = forks.map((fork) => {
        return(fork.json())
    })

    forks_json = await Promise.all(forks_json)

    // repo_json.data.forEach(async (fork) => {
    //     console.log('here')
    //     // fetch(`https://api.github.com/repos/${fork.owner.login}/Stocksera/compare/${user}:master...master`)
    //         // .then(res => res.json())
    //         .then(json => {
    //             forks.push(json)
    //         })
    //     // const fork_json = await fork_res.json();
    //     // forks.push(fork_json)
    // })

    return {
        statusCode: 200,
        body: JSON.stringify({
            forks: fork_json
        })
    }
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(repo_json)
    // }

}