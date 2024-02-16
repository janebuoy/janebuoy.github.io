const config = {
  title: 'Micrograph',
  description: 'Research Data Management, Programming, Web Mapping',
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
