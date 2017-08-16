<style lang="scss" scoped>
  .home {
    text-align: center;
  }
</style>

<template lang="pug">
  .home
    h1 Vuedoo Documentation
    material-button
</template>

<script>
  import MaterialButton from '../../components/MaterialButton.vue'

  export default {
    mounted () {
      document.title = 'Home | Vuedoo'
    },
    components: { MaterialButton }
  }
</script>
