

const styles = {
    wrapper: {
        width: 'calc(50% - 48px)',
        backgroundColor: '#F6F8FA',
        padding: 48
    },
    fork: {
        padding: 24,
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
    const to_return = splits[2] + splits[3]
    return(to_return)
}

const Forks = (props) => {
    const forks = props.forks.forks
    const user = props.forks.user
    const repo = props.forks.repo

    return(
        <div style={styles.wrapper}>
            <h1><a href={`https://github.com/${user}/${repo}`}>{user}/{repo}</a></h1>

            {forks.map((fork) => {
                return(
                <div style={styles.fork}>
                    <h4>
                        {getRepoFromUrl(fork.html_url)}
                    </h4>
                </div>
                )
            })}
        </div>
    )
}

export default Forks