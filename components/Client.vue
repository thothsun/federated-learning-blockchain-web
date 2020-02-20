<template>
  <el-card shadow="always" body-style="padding:20px"
           style="height: 200px;width: 250px;margin: 20px;display: inline-block">

    <div style="text-align: center">
      <b><i class="el-icon-monitor"></i>&nbsp;&nbsp;&nbsp;&nbsp;client {{id}}</b>
    </div>

    <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center">
      power
      <el-rate v-model="rate" :colors="colors" :disabled="readonly"></el-rate>
    </div>

  </el-card>
</template>

<script>
  export default {
    name: "Client",
    props: {
      id: 0,
      power: 0,
      readonly: false
    },
    data() {
      return {
        rate: this.power,
        colors: {2: '#90EE90', 4: '#32CD32', 5: '#008000'}
      }
    },
    methods: {

    }
  }
</script>

<style scoped>


</style>
