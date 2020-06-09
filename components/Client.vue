<template>
  <el-card shadow="always" body-style="padding:20px"
           style="height: 280px;width: 250px;margin: 20px;display: inline-block"
           v-loading="this.state==='mining...'" element-loading-text="mining..."
           element-loading-spinner="el-icon-loading">

    <div style="display: flex;justify-content:space-around;align-items: center;font-weight: 600">
      <i class="el-icon-monitor"></i>

      <span>{{this.$t('client')}} {{id+1}}</span>

      <span style="color: orange">{{winner}}</span>
    </div>

    <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('state')}}</span>
      {{state}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('power')}}</span>
      <el-rate v-model="power" :colors="colors" :disabled="readonly"></el-rate>
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('samples')}}</span>
      <el-input-number v-model="samples" :min="1000" :step="1000" :max="10000" size="mini"
                       :disabled="readonly"></el-input-number>
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('accuracy')}}</span>
      {{accu}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('loss')}}</span>
      {{loss}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('block_height1')}}</span>
      {{myblockheight}}
    </div>

    <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
      <span>{{this.$t('reward')}}</span>
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
      clientnum: 0,
      blockheight: 0
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
        winner: ' ',
        myreward: '--',
        myblockheight: this.blockheight
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
      blockheight: function (val) {
        this.myblockheight = val
      },
      power: function (val) {
        this.$store.commit('update', {
          id: this.id,
          power: this.power
        })
      },
      result: function () {
        let flag = this.power * 2 - 1
        this.loss = (this.result[0][flag] - this.samples / 1000 * 0.001 + Math.random() * 0.001).toFixed(4)
        this.accu = (this.result[1][flag] + this.samples / 1000 * 0.001 + Math.random() * 0.001).toFixed(4)
      },
      state: function (val) {
        if (val === 'training...') {
          this.winner = ' '
        }
        if (val === 'synchronizing...') {
          let winnerId = this.$store.getters.candidates

          if (this.id === winnerId) {
            this.myblockheight += 1
            this.winner = 'WINNER'
          }
          if (this.id === winnerId) {
            this.myreward = (this.reward * 0.7 / this.clientnum * this.accu + this.reward * 0.2).toFixed(3)
          } else {
            this.myreward = (this.reward * 0.7 / this.clientnum * this.accu).toFixed(3)
          }

        }

      },

    }
  }
</script>

<style scoped>
</style>
