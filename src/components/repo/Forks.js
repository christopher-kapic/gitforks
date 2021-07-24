

const styles = {
    wrapper: {
        width: 'calc(50% - 48px)',
        backgroundColor: '#F6F8FA',
        padding: 48,
        height: 'calc(100% - 48px)',
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
    const to_return = splits[3] + splits[4]
    return(to_return)
}

/**
 * 
 * @param {String} url of the form 'https://github.com/user/repo'
 * @returns {String} link to raw readme
 */
const getReadme = (url) => {

}

const Forks = (props) => {
    let forks = props.forks.forks
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
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h4 onClick={setReadme(fork.html_url)} style={{cursor: 'pointer'}}>
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