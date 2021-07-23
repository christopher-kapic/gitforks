import { useParams } from "react-router";

const Repo = () => {
    const { user, repo } = useParams();

    return (
        <p>{user}/{repo}</p>
    )
}

export default Repo