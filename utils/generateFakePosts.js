const fs = require ('fs')
const path = require('path')
const { faker } = require('@faker-js/faker');
const { log } = require('console');
const { randomInt } = require('crypto');

const NUMBER_OF_POSTS = 25; // Number of fake posts to generate
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'test');

// Ensure content/posts directory exists
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true })
}

// Generate fake posts
for (let i = 1; i <= NUMBER_OF_POSTS; i++) {
  const title = faker.lorem.words(5)
  const slug = faker.helpers.slugify(title.toLowerCase())
  const date = faker.date.past().toISOString()
  const content = faker.lorem.paragraphs(randomInt(3))
  const categories = ['index']

  const postContent = `---
title: "${title}"
date: "${date}"
category: ${categories}
---
${content}`

 fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.md`), postContent, 'utf8');
 console.log(`Generated post: ${title}`);

}