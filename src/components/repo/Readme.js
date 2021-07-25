import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import fetch from 'node-fetch'
const gfm = require('remark-gfm')
const raw = require('rehype-raw')

const styles = {
    container: {
        maxHeight: '100vh',
        height: '100vh',
        overflowY: 'scroll'
    }
}

const Readme = (props) => {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        fetch(props.readme).then(res => res.text()).then(md => setMarkdown(md))
    }, [props.readme])

    return(
        <div style={styles.container}>
            <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[raw]} children={ markdown }/>
        </div>
    )
}

export default Readme