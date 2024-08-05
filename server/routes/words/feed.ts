import { Feed } from 'feed'
import { serverQueryContent } from '#content/server'

const basePath = 'https://micrograph.io'

export default defineEventHandler(async(event) => {
    const docs = await serverQueryContent(event)
    .where({published: true})
    .find();

    const feed = new Feed({
        title: 'Micrograph',
        id: basePath + "/words",
        link: basePath + "/words",
        description: "Blog posts by Janne Jensen on micrograph.io/words",
        feedLinks: {
            json: basePath + "/words/json",
            atom: basePath + "/words/atom",
            rss: basePath + "/words/feed"
        },
    })

    docs.forEach((doc) => {
        feed.addItem({
            title: doc.title,
            id: basePath + doc._path,
            link: basePath + doc._path,
            date: new Date() 
        })
    })

    return feed.rss2()
} )