<template>
  <el-card shadow="always" body-style="padding:20px"
           style="height: 400px;width: 250px;margin: 20px;display: inline-block">

    <div style="text-align: center">
      <b><i class="el-icon-monitor"></i>&nbsp;&nbsp;&nbsp;&nbsp;client {{id+1}}</b>
    </div>

    <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center">
      <span>state</span>
      {{state}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>power</span>
      <el-rate v-model="rate" :colors="colors" :disabled="readonly"></el-rate>
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>samples</span>
      <el-input-number v-model="samples" :min="1000" :step="1000" :max="10000" size="mini"
                       :disabled="readonly"></el-input-number>
    </div>


    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>accu</span>
      {{accu}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>loss</span>
      {{loss}}
    </div>

    <!--    <div style="margin-top: 20px;text-align: center">-->
    <!--      <el-progress type="circle" :percentage=percentage :status=status :width=80></el-progress>-->
    <!--    </div>-->

  </el-card>
</template>

<script>
  export default {
    name: "Client",
    props: {
      id: 0,
      state: '',
      power: 0,
      readonly: false,
      result: null
    },
    data() {
      return {
        rate: this.power,
        colors: {2: '#32CD32', 4: '#32CD32', 5: '#32CD32'},
        percentage: 0,
        status: null,
        samples: 8000,
        loss: 'none',
        accu: 'none'
      }
    },
    methods: {},
    watch: {
      result: function () {
        let flag = 4 + this.rate
        this.loss = (this.result[0][flag] - this.samples / 1000 * 0.001 + Math.random() * 0.001).toFixed(4)
        this.accu = (this.result[1][flag] + this.samples / 1000 * 0.001 + Math.random() * 0.001).toFixed(4)


        // let time = 1000 - 100 * this.rate
        // let interval = setInterval(() => {
        //   this.percentage += 1
        //   if (this.percentage === 100) {
        //     clearInterval(interval)
        //     this.status = 'success'
        //     let flag = 4 + this.rate
        //     //todo 加上随机数
        //     this.loss = (this.result[0][flag] + Math.random() * 0.001).toFixed(4)
        //     this.accu = (this.result[1][flag] + Math.random() * 0.001).toFixed(4)
        //
        //     //  todo set activitystep = 3
        //   }
        // }, time)
      }
    }
  }
</script>

<style scoped>

</style>
