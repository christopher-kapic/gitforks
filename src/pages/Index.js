import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'


const styles = {
    mainDiv: {
        backgroundColor: '#f6f8fa',
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center'
    },
    content: {
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    input: {
        borderStyle: 'none none solid none',
        height: 64,
        width: '100%',
        outline: 'none',
        fontSize: 24,
        backgroundColor: '#f6f8fa',
        textAlign: 'center'
    },
    title: {
        fontSize: 64
    }
}
const Index = () => {
    const [repo, setRepo] = useState('')
    // const history = useHistory();
    // console.log(history)
    const history = useHistory();

    const handleSubmit = (e) => {
        history.push(`/${repo}`);
        e.preventDefault();
    }

    return (
        <div style={styles.mainDiv}>
            <div style={styles.content}>
                <h1 style={styles.title}>gitforks</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username/repo" value={repo} style={styles.input} onChange={(e) => {setRepo(e.target.value)}}/>
                </form>
                <div>
                    <p>by <Link to="/about">Christopher Kapic</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Index;