<style lang="scss" scoped>
  .component {
    text-align: center;
  }

  .logo {
    max-width: 300px;
    width: 100%;
  }
</style>

<template lang="pug">
  .component
    h1 Vuedoo Documentation
    h3 Version {{ config.applicationVersion }}
    p Vue with a bit of dark magic.
    img.logo(src="../assets/logo.png", alt="")
</template>

<script>
  import config from '~/src/config'

  export default {
    data () {
      return { config }
    },
    mounted () {
      document.title = 'Home | Vuedoo'
    }
  }
</script>
