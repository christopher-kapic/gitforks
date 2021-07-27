import { useParams } from "react-router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Forks from "../components/repo/Forks";
import Readme from "../components/repo/Readme";
import Header from "../components/Header"

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    mainDiv: {
        maxHeight: 'calc(100vh - 64px)',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'row'
    }
}

const Repo = () => {
    const { user, repo } = useParams();
    const [forks, setForks] = useState(false);
    const [readme, setReadme] = useState()

    useEffect(() => {
        fetch(`/.netlify/functions/forks`, {
            method: "POST",
            headers: {
                user: user,
                repo: repo
            }
        }).then(res => res.json())
            .then(json => setForks(json))
        
        setReadme(`https://cdn.jsdelivr.net/gh/${user}/${repo}/README.md`)
    }, [repo, user])

    return (
        <div style={styles.wrapper}>
        <Header/>
        <div style={styles.mainDiv}>
            {
                forks ? <Forks forks={forks} setReadme={setReadme}/> : <p style={{margin: '0 auto'}}>Loading...</p>
            }
            {
                forks ? <Readme readme={readme}/> : <></>
            }
        </div>
        </div>
    )
}

export default Repo