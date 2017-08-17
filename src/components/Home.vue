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
    p Vue with a bit of dark magic.
    img.logo(src="../assets/vuedoo.png", alt="")
</template>

<script>
  export default {
    mounted () {
      document.title = 'Home | Vuedoo'
    }
  }
</script>
