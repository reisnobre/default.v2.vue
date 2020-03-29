module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  // defaultExample: true,
  sections: [
    {
      name: 'Home components',
      components: ['src/views/Home.vue', 'src/views/home/**/*.vue']
    },
    {
      name: 'About components',
      components: ['src/views/About.vue', 'src/views/about/**/*.vue']
    }
  ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: 'expand'
}
