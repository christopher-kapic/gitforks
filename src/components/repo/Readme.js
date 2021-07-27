import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import fetch from 'node-fetch'
const gfm = require('remark-gfm')
const raw = require('rehype-raw')

const styles = {
    container: {
        maxHeight: '100vh',
        height: '100vh',
        overflowY: 'scroll',
        padding: '0px 24px 0px 24px'
    }
}

/**
 * @param {String} markdown Original markdown from Github
 * @returns {String} Markdown, but image links are updated for raw.githubusercontent
 */
const updateImageLinks = (md, rm) => {
    const reg = /^!\[[^\]]*]\(\.\/([a-zA-Z]+(\/[a-zA-Z]+)+)([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+\)$/gm

    let to_return = md;

    const to_replace = md.match(reg);

    if (!to_replace) {
        return md
    }
    if (!rm) {
        return md
    }

    to_replace.forEach((img) => {
        let new_img = img.split('](./')[1]
        new_img = new_img.substring(0, new_img.length - 1);
        const repo = rm.substring(0, rm.length - 10)
        new_img = `${repo}/${new_img}`
        console.log(new_img)
        to_return.replace(img, new_img)
    })


    return (to_return)
}

const Readme = (props) => {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        fetch(props.readme).then(res => res.text()).then(md => setMarkdown(updateImageLinks(md, props.readme)))
        console.log(updateImageLinks(md, props.readme))
    }, [props.readme, markdown])

    return(
        <div style={styles.container}>
            <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[raw]} children={ markdown }/>
        </div>
    )
}

export default Readme