<style lang="scss" scoped>
  button {
    border: none;
    border-radius: 0;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    cursor: pointer;
    font-size: 4vh;
    padding: 1vh 2vh;
    outline: none;

    &:focus,
    &:hover {
      background-color: green;
    }
  }
</style>

<template lang="pug">
  .material-button
    button material test
</template>
