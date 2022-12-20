const config = {
  title: 'Micrograph.io',
  description: 'Programming Ethnographer, Frontend Developer, Web Mapper'
}

export default defineAppConfig({
  title: config.title,
  meta: [{
    name: 'description',
    content: config.description
  }]
})