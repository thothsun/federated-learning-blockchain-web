<template>

</template>

<script>
  import '~/assets/js/data.js'
  import {run} from '~/assets/js/scriptplus.js'

  export default {
    name: "testmnist",
    data() {
      return {}
    },
    created() {
      run()
    }
  }
</script>

<style scoped>

</style>
