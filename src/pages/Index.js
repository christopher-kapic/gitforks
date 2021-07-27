import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'


const styles = {
    mainDiv: {
        backgroundColor: '#f6f8fa',
        display: 'flex',
        width: '100vw',
        height: 'calc(100vh-64px)',
        justifyContent: 'center'
    },
    content: {
        width: 500,
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    input: {
        borderStyle: 'none none solid none',
        height: 64,
        width: '90%',
        outline: 'none',
        fontSize: 24,
        backgroundColor: '#f6f8fa',
    },
    title: {
        fontSize: 64,
        color: '#211f1f'
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
        <div style={styles.mainDiv} id="mainDiv">
            <div style={styles.content}>
                <h1 style={styles.title}>gitforks</h1>
                <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <input type="text" autoFocus placeholder="username/repo" value={repo} style={styles.input} onChange={(e) => {setRepo(e.target.value)}}/>
                </form>
                <div>
                    <p>by <Link to="/about">Christopher Kapic</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Index;