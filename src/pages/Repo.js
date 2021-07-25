import { useParams } from "react-router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Forks from "../components/repo/Forks";
import Readme from "../components/repo/Readme";

const styles = {
    mainDiv: {
        maxHeight: '100vh',
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
        <div style={styles.mainDiv}>
            {
                forks ? <Forks forks={forks} setReadme={setReadme}/> : <p>Loading...</p>
            }
            {
                forks ? <Readme readme={readme}/> : <></>
            }
        </div>
    )
}

export default Repo