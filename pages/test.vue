<template>

</template>

<script>
  export default {
    name: "test",
    created() {
      var attr = [{n1: 1, n2: 3}, {n1: 99, n2: 103}, {n1: 45, n2: 46}];

      let a = attr.slice(0, 2)
      console.log(attr)
      console.log(a)
    }
  }
</script>

<style scoped>

</style>
