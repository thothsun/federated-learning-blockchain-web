<template>

</template>

<script>
  export default {
    name: "test",
    created() {
      let data = {
        id:4
      }
      let a = new Array(3)
      a[0] = {
        id: 0,
        power: 8
      }
      a[1] = {
        id: 1,
        power: 9
      }
      a[2] = {
        id: 4,
        power: 1
      }
      console.log(a)
      console.log(a.findIndex((v) => v.id === 4))
    }
  }
</script>

<style scoped>

</style>
