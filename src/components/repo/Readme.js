import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import fetch from 'node-fetch'
const gfm = require('remark-gfm')
const raw = require('rehype-raw')

const styles = {
    container: {
        maxHeight: '100%',
        height: '100%',
        overflowY: 'scroll',
        padding: '0px 24px 0px 24px',
        maxWidth: 'calc(50% - 48px)'
    }
}

/**
 * @param {String} markdown Original markdown from Github
 * @returns {String} Markdown, but image links are updated for raw.githubusercontent
 */
const updateImageLinks = (md, rm) => {
    // const reg = /^!\[[^\]]*]\(\.\/([a-zA-Z]+(\/[a-zA-Z]+)+)([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+\)$/gm
    const reg = /^!\[[^\]]*]\(\.\/[^\]]*\)$/gm

    let to_return = md;

    const to_replace = md.match(reg);

    if (!to_replace) {
        return md
    }
    if (!rm) {
        return md
    }

    to_replace.forEach((img) => {
        const new_img_arr = img.split('](./')
        let new_img = new_img_arr[1].substring(0, new_img_arr[1].length - 1);
        const repo = rm.substring(0, rm.length - 10)
        // new_img = `${new_img_arr[0]}](${repo}/${new_img})`
        new_img = `<img src="${repo}/${new_img}" style="max-width:500px;"/>`
        console.log(img)
        console.log(new_img)
        to_return = to_return.replace(img, new_img)
    })

    console.log(to_return)

    return (to_return)
}

const Readme = (props) => {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        // fetch(props.readme).then(res => res.text()).then(md => setMarkdown(updateImageLinks(md, props.readme)))
        fetch(props.readme).then(res => res.text()).then(md => updateImageLinks(md, props.readme)).then(fmd => setMarkdown(fmd))
    }, [props.readme])

    return(
        <div style={styles.container}>
            <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[raw]} children={ markdown }/>
        </div>
    )
}

export default Readme