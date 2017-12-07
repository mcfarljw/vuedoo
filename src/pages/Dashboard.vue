<style lang="stylus" scoped>
  .page
    padding-top: 10%
    text-align: center

  .logo
    max-width: 300px
    width: 100%
</style>

<template lang="pug">
  .dashboard.page
    h1 Vuedoo Documentation
    h3 Version {{ config.applicationVersion }}
    p Vue with a bit of dark magic.
    img.logo(src="../assets/logo.png", alt="")
</template>

<script>
  import config from '~/src/config'
  import languages from '~/data/languages'

  export default {
    data () {
      return { config, languages }
    },
    mounted () {
      document.title = 'Dashboard | Vuedoo'
    }
  }
</script>
