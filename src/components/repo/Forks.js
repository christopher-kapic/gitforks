
const styles = {
    wrapper: {
        width: 'calc(50% - 48px)',
        backgroundColor: '#F6F8FA',
        padding: 48,
        height: 'calc(100% - 96px)',
        overflowY: 'scroll'
    },
    fork: {
        padding: '12px 12px 12px 24px',
        margin: 12,
        borderRadius: 4,
        backgroundColor: '#ffffff'
    }
}

/**
 * 
 * @param {String} url of the form `https://github.com/username/repo`
 */
const getRepoFromUrl = (url) => {
    const splits = url.split('/')
    const to_return = splits[3] + '/' + splits[4]
    return(to_return)
}

/**
 * 
 * @param {String} repo of the form 'user/repo'
 * @returns {String} link to raw readme
 */
const getReadme = (repo) => {
    return(`https://cdn.jsdelivr.net/gh/${repo}/README.md`)
}

const sortForks = (forks) => {
    let temp_forks = forks;
    temp_forks.sort((fork_a, fork_b)=> {return(fork_b.ahead_by - fork_a.ahead_by)})
    return(temp_forks)
}

const Forks = (props) => {
    // const [forks, setForks] = useState(props.forks.forks)
    // const forks = props.forks.forks
    const forks = sortForks(props.forks.forks)
    const user = props.forks.user
    const repo = props.forks.repo
    const setReadme = props.setReadme


    // sort forks by commits ahead

    return(
        <div style={styles.wrapper}>
            <h1><a href={`https://github.com/${user}/${repo}`}>{user}/{repo}</a></h1>

            {forks.map((fork) => {
                return(
                <div style={styles.fork}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h4 onClick={() => {setReadme(getReadme(getRepoFromUrl(fork.html_url))); console.log('set')}} style={{cursor: 'pointer'}}>
                            {getRepoFromUrl(fork.html_url)}
                        </h4>
                        <p>[<a href={fork.html_url.split('/compare/')[0]}>Repo</a>]</p>
                    </div>
                    <p>Commits ahead: {fork.ahead_by} | Commits behind: {fork.behind_by}</p>
               </div>
                )
            })}
        </div>
    )
}

export default Forks