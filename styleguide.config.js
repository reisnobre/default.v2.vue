module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  components: 'src/**/*.vue',
  sections: [
    {
      name: 'Clientes',
      components: 'src/views/dashboard/d-clients.vue',
      sections: [
        {
          components: 'src/components/dashboard/d-clients/*.vue'
        }
      ]
    },
    {
      name: 'Desenvolvedores',
      components: 'src/views//d-clients/*.vue'
    }
  ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: 'expand'
}
