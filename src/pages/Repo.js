import { useParams } from "react-router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Forks from "../components/repo/Forks";

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
    }, [repo, user])

    console.log(readme) // Useless, just reading the variable for testing for CI
    return (
        <>
            {
                forks ? <Forks forks={forks} setReadme={setReadme}/> : <p>Loading...</p>
            }
        </>
    )
}

export default Repo