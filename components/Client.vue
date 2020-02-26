<template>
  <el-card shadow="always" body-style="padding:20px"
           style="height: 280px;width: 250px;margin: 20px;display: inline-block"
           v-loading="this.state==='mining...'" element-loading-text="mining...">

    <div style="display: flex;justify-content:space-around;align-items: center;font-weight: 600">
      <i class="el-icon-monitor"></i>

      <span>client {{id+1}}</span>

      <span style="color: orange">{{winner}}</span>
    </div>

    <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center">
      <span>state</span>
      {{state}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>power</span>
      <el-rate v-model="power" :colors="colors" :disabled="readonly"></el-rate>
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>samples</span>
      <el-input-number v-model="samples" :min="1000" :step="1000" :max="10000" size="mini"
                       :disabled="readonly"></el-input-number>
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>accuracy</span>
      {{accu}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>loss</span>
      {{loss}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>block height</span>
      {{blockheight}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>reward</span>
      {{myreward}}
    </div>


  </el-card>
</template>

<script>
  export default {
    name: "Client",
    props: {
      id: 0,
      state: '',
      readonly: false,
      result: null,
      reward: 0,
      clientnum: 0
    },
    data() {
      return {
        power: 4,
        colors: {2: '#32CD32', 4: '#32CD32', 5: '#32CD32'},
        percentage: 0,
        status: null,
        samples: 8000,
        loss: '--',
        accu: '--',
        blockheight: 1023,
        winner: ' ',
        myreward: '--',
      }
    },
    methods: {},
    created: function () {
      this.$store.commit('add', {
        id: this.id,
        power: this.power
      });
    },
    destroyed: function () {
      this.$store.commit('remove', {
        id: this.id,
        power: this.power
      })
    },
    watch: {
      power: function (val) {
        this.$store.commit('update', {
          id: this.id,
          power: this.power
        })
      },
      result: function () {
        let flag = 4 + this.power
        this.loss = (this.result[0][flag] - this.samples / 1000 * 0.001 + Math.random() * 0.001).toFixed(4)
        this.accu = (this.result[1][flag] + this.samples / 1000 * 0.001 + Math.random() * 0.001).toFixed(4)
      },
      state: function (val) {
        if (val === 'training...') {
          this.winner = ' '
        }
        if (val === 'finish') {
          let winnerId = this.$store.getters.candidates

          if (this.id === winnerId) {
            this.blockheight = 1024
            this.winner = 'WINNER'
          }
          if (this.id === winnerId) {
            this.myreward = (this.reward * 0.7 / this.clientnum * this.accu + this.reward * 0.2).toFixed(3)
          } else {
            this.myreward = (this.reward * 0.7 / this.clientnum * this.accu).toFixed(3)
          }
          setTimeout(() => {
            this.blockheight = 1024
          }, 5000)
        }

      },

    }
  }
</script>

<style scoped>
</style>
