<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <div id="update" v-if="updateExists">
      <p>New update found!</p>
      <button @click="refreshApp">
        Click to Refresh
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      loaded: false,
      refreshing: true,
      updateExists: false,
      registration: null

    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
  beforeMount () {
    // this.$store.dispatch('authenticationStore/get', [this, { username: 'admin@admin.com', password: 'nit_admin' }]).then(status => {
    // }).catch(err => {
    //   console.log(err)
    // })
    // auto login for laravel applications
    // const authTokens = JSON.parse(window.localStorage.getItem('authTokens'))
    // if (authTokens) this.autoLogin(authTokens)
    // else this.$router.push({ name: 'login' })
  },
  methods: {
    autoLogin (tokens) {
      this.$store.dispatch('userStore/get', this).then(status => {
        if (status) {
          if (!this.$route.matched.length) {
            const target = this.$route.path.split('/').pop()
            if (this.$router.options.routes.map(r => r.name).indexOf(target) !== -1) this.$router.push({ name: target, query: this.$route.query })
            else this.$router.push({ name: 'clients' })
          } else {
            // if (this.$route.name === 'login') {
            //   this.$router.push({ name: 'clients' })
            // }
          }
        } else {
          this.$store.dispatch('authStore/delete')
          this.$router.push({ name: 'login' })
        }
      })
    },
    showRefreshUI (e) {
      this.registration = e.detail
      this.updateExists = true
    },
    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) return
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage('skipWaiting')
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
  @import "./scss/main.scss";
</style>
