<style lang="stylus" scoped>
  .page
    padding-top 10%
    text-align center

  .logo
    max-width 300px
    width 100%
</style>

<template lang="pug">
  .dashboard.page
    h1 Vuedoo Documentation
    h3 Version {{ config.applicationVersion }}
    p Vue with a bit of dark magic.
    img.logo(src="images/logo.png", alt="")
</template>

<script>
  import languages from '~/data/languages'
  import config from '~/src/config'
  import TestWorker from '~/src/workers/TestWorker.js'

  export default {
    mounted () {
      document.title = 'Dashboard | Vuedoo'

      this.spawnWorker()
    },
    data () {
      return { config, languages }
    },
    methods: {
      spawnWorker () {
        const worker = new TestWorker()

        worker.onmessage = function (result) {
          console.log('worker status:', result.data)
        }

        worker.postMessage('success')
      }
    }
  }
</script>
