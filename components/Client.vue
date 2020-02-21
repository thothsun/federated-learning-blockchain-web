<template>
  <el-card shadow="always" body-style="padding:20px"
           style="height: 250px;width: 250px;margin: 20px;display: inline-block">

    <div style="text-align: center">
      <b><i class="el-icon-monitor"></i>&nbsp;&nbsp;&nbsp;&nbsp;client {{id}}</b>
    </div>

    <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center">
      power
      <el-rate v-model="rate" :colors="colors" :disabled="readonly"></el-rate>
    </div>


    <div style="margin-top: 20px;text-align: center">
      <el-progress type="circle" :percentage=percentage :status=status :width=80></el-progress>
    </div>

    <div v-show="accu!=null">
      accu:
      {{accu}}
    </div>

    <div v-show="loss!=null">
      loss:
      {{loss}}
    </div>

  </el-card>
</template>

<script>
  export default {
    name: "Client",
    props: {
      id: 0,
      power: 0,
      readonly: false,
      result: null
    },
    data() {
      return {
        rate: this.power,
        colors: {2: '#90EE90', 4: '#32CD32', 5: '#008000'},
        percentage: 0,
        status: null,
        loss: null,
        accu: null
      }
    },
    methods: {},
    watch: {
      result: function () {
        let time = 1000 - 100 * this.rate
        let interval = setInterval(() => {
          this.percentage += 1
          if (this.percentage === 100) {
            clearInterval(interval)
            this.status = 'success'
            let flag = 4 + this.rate
            //todo 加上随机数
            this.loss = (this.result[0][flag] + Math.random() * 0.001).toFixed(4)
            this.accu = (this.result[1][flag] + Math.random() * 0.001).toFixed(4)

            //  todo set activitystep = 3
          }
        }, time)
      }
    }
  }
</script>

<style scoped>

</style>
