<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Indie+Flower');

  html, body {
    font-family: 'Indie Flower', cursive;
  }
</style>

<template lang="pug">
  v-app(light)
    main
      v-container(fluid)
        router-view
</template>

<script>
  export default {}
</script>
