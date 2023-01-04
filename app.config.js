const config = {
  title: 'Micrograph',
  description: 'Programming Ethnographer, Frontend Developer, Web Mapper',
};

export default defineAppConfig({
  title: config.title,
  meta: [
    {
      name: 'description',
      content: config.description,
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/assets/favicon/favicon-32x32.png',
    },
  ],
});
