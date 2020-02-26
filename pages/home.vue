<template>
  <el-container style="height: 100vh;padding:1% 3% 0 3%">


    <el-aside style="padding: 20px 30px 0 0">
      <h3>Configure Clients</h3>

      <div class="menu">
        client number
        <el-input-number
          v-model="clientNum"
          controls-position="right"
          :min="1"
          :max="20"
          size="mini"
          @change="setprocess(0)"
          :disabled="isTraining"
        ></el-input-number>
      </div>

      <div class="menu">
        dataset
        <el-select v-model="datasetvalue"
                   placeholder="select a dataset"
                   size="mini"
                   @change="setprocess(0)"
                   :disabled="isTraining">
          <el-option
            v-for="item in datasetoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>

      <el-divider></el-divider>

      <h3>Post a Task</h3>

      <div class="menu">
        model
        <el-select v-model="modelvalue"
                   placeholder="select a model"
                   size="mini"
                   @change="setprocess(1)"
                   :disabled="isTraining">
          <el-option-group
            v-for="group in modeloptions"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-option-group>
        </el-select>
      </div>

      <div class="menu">
        reward
        <el-input-number v-model="reward"
                         :min="100"
                         :max="10000"
                         :step="100"
                         size="mini"
                         @focus="setprocess(1)"
                         :disabled="isTraining">
        </el-input-number>
      </div>

      <div class="menu">
        <span>train time (s)</span>
        <el-input-number v-model="traintime"
                         :min="10"
                         :max="60"
                         :step="5"
                         size="mini"
                         @focus="setprocess(1)"
                         :disabled="isTraining">
        </el-input-number>
      </div>


      <el-divider></el-divider>

      <span>Train Progress</span>

      <div style="text-align: center;margin-top: 10px">
        <el-progress :percentage="currentpercentage" :status="currentstatus"></el-progress>
      </div>

      <div style="text-align: center;margin-top: 12px">
        <el-button type="success"
                   v-text="btnMsg"
                   @click="startTrain()"
                   size="mini"
                   :disabled="isTraining">
        </el-button>
      </div>

      <el-divider></el-divider>

      <h3>Blockchain Info</h3>

      <div class="menu">
        <span>block height</span>
        <span>{{this.blockheight}}</span>
      </div>

      <div class="menu">
        <span>node number</span>
        <span>{{this.clientNum}}</span>
      </div>

      <div class="menu">
        <!--        todo 计算全网算力-->
        <span>whole power</span>
        <span>{{wholepower}}</span>
      </div>

      <div class="menu">
        <span>update time</span>
        <span>{{updatetime}}</span>
      </div>

      <div class="menu">
        <span>current reward</span>
        <span>{{this.reward*0.2.toFixed(1)}}</span>
      </div>

      <el-divider></el-divider>

    </el-aside>

    <el-container style="padding: 20px 50px">
      <el-header height="130px">
        <h3>Process</h3>
        <div>
          <el-steps :active=activestep finish-status="success" align-center>
            <el-step title="Configure Clients" description=""></el-step>
            <el-step title="Post a Task" description=""></el-step>
            <el-step title="Training" description=""></el-step>
            <el-step title="Mining" description=""></el-step>
            <el-step title="Finished" description="" icon="el-icon-finished"></el-step>
          </el-steps>
        </div>
        <el-divider></el-divider>
      </el-header>
      <el-main style="border: lightgray dashed 1px;border-radius: 10px;background-color: #f7f8fb">
        <div style="display: flex;justify-content: flex-start;align-content: flex-start;flex-wrap: wrap">
          <Client v-for="(client,index) in clientList" :key="index" :id=index :state="state"
                  :readonly="isTraining" :result="result" :reward="reward" :clientnum="clientNum"></Client>
        </div>
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
  import Client from "../components/Client";
  import {run} from '~/assets/js/script.js'

  export default {
    name: "home",
    components: {
      Client
    },
    data() {
      return {

        activestep: 0,

        //client
        clientNum: 5,
        clientList: [],

        //model
        modeloptions: [{
          label: 'Neural Network',
          options: [{
            value: 'NN',
            label: 'NN'
          }, {
            value: 'CNN',
            label: 'CNN'
          }, {
            value: 'RNN',
            label: 'RNN',
            disabled: true
          }],
        }, {
          label: 'Linear Models',
          options: [{
            value: 'Linear-Regression',
            label: 'Linear Regression',
            disabled: true
          }, {
            value: 'Logistic-Regression',
            label: 'Logistic Regression',
            disabled: true
          }],
        }, {
          label: 'Decision Trees',
          options: [{
            value: 'Classification-Decision-Tree',
            label: 'Classification Decision Tree',
            disabled: true
          }, {
            value: 'Regression-Decision-Tree',
            label: 'Regression Decision Tree',
            disabled: true
          }]
        }, {
          label: 'Support Vector Machines',
          options: [{
            value: 'SVR',
            label: 'SVR',
            disabled: true
          }, {
            value: 'SVC',
            label: 'SVC',
            disabled: true
          }]
        }
        ],
        modelvalue: '',

        //dataset
        datasetoptions: [
          {
            value: 'MNIST',
            label: 'MNIST'
          }
        ],
        datasetvalue: '',

        reward: 1000,

        traintime: 30,

        btnMsg: 'Run',

        state: 'free',

        isTraining: false,

        currentpercentage: 0,

        currentstatus: null,

        result: null,

        updatetime: '',

        blockheight: 1023
      }
    },
    computed: {
      wholepower() {
        let a = this.$store.state.powerList
        let sum = 0
        for (let i = 0; i < a.length; i++) {
          sum += a[i].power
        }
        return sum
      }
    },
    created() {
      this.initClient()

      var time = new Date();
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();

      this.updatetime = this.getcurrenttime()
    },
    watch: {
      clientNum: function () {
        this.initClient()
      },
      result: function () {
      }
    },
    methods: {
      add0(m) {
        return m < 10 ? '0' + m : m
      },

      getcurrenttime() {
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();

        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
      },

      initClient() {
        this.clientList = new Array(this.clientNum)
      },
      setprocess(step) {
        this.activestep = step
      },
      startTrain() {
        if (this.datasetvalue === '') {
          this.$message.error('Please select a dataset.');
          return
        }

        if (this.modelvalue === '') {
          this.$message.error('Please select a model.');
          return
        }

        this.setprocess(2)
        this.btnMsg = 'Running'
        this.state = 'training...'
        this.isTraining = true
        this.currentpercentage = 0
        this.currentstatus = null

        let interval = setInterval(() => {
          this.currentpercentage += 1
          if (this.currentpercentage === 100) {
            clearInterval(interval)
            this.currentstatus = 'success'
            this.state = 'mining...'
            this.setprocess(3)
            this.result = run()
            this.$message({
              message: 'Train Finished!', type: 'success'
            });
            this.startMining()
          }
        }, this.traintime * 1000 / 100)

      },

      startMining() {
        setTimeout(() => {
          this.$message({
            message: 'Mine Finished!', type: 'success'
          });
          this.btnMsg = 'Run'
          this.isTraining = false
          this.state = 'finish'
          this.setprocess(4)
          setTimeout(() => {
            this.blockheight = 1024
            this.updatetime = this.getcurrenttime()
          }, 5000)
        }, 10000)
      }
    }
  }
</script>

<style scoped>
  .menu {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center
  }

</style>
