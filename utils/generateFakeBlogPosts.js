const fs = require ('fs')
const path = require('path')
const { faker } = require('@faker-js/faker');

const NUMBER_OF_POSTS = 25; // Number of fake posts to generate
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'words', 'test');

// Ensure content/posts directory exists
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true })
}

// Generate fake posts
for (let i = 1; i <= NUMBER_OF_POSTS; i++) {
  const title = faker.lorem.words(5)
  const slug = faker.helpers.slugify(title.toLowerCase())
  const date = faker.date.past().toISOString()
  const content = faker.lorem.paragraphs(Math.floor(Math.random() * 10))
  const categories = ['words']
  const tags = []

  for(let i = 1; i <= 8; i++) {
    tags.push(faker.music.genre())
  }
  const set = new Set(tags)
  const arr = Array.from(set)

  // Format tags as a YAML list
  const formattedTags = arr.map(tag => `${tag}`).join('\n  - ');

  const postContent = `---
title: "${title}"
published: true
category: ${JSON.stringify(categories)}
tags: 
  - ${formattedTags}
meta:
  updatedAt: ${date}
---
${content}`

 fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.md`), postContent, 'utf8');
 console.log(`Generated post: ${title}`);

}