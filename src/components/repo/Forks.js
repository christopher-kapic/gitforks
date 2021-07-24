

const styles = {
    fork: {
        padding: 10,
        width: '80%',
        backgroundColor: '#353535'
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
        <>
            <h1><a href={`https://github.com/${user}/${repo}`}>{user}/{repo}</a></h1>

            {forks.map((fork) => {
                return(
                <div style={styles.fork}>
                    <h3>
                        {getRepoFromUrl(fork.html_url)}
                    </h3>
                </div>
                )
            })}
        </>
    )
}

export default Forks