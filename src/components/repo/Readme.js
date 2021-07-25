import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import fetch from 'node-fetch'


const Readme = (props) => {
    const [markdown, setMarkdown] = useState(false)

    useEffect(() => {
        fetch(props.readme).then(res => res.text).then(md => setMarkdown(md))
    }, [])

    return(
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[raw]} children={ markdown }/>
    )
}

export default Readme