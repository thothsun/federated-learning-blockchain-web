<template>
  <el-container style="height: 100vh;padding:3% 3% 0 3%">


    <el-aside style="padding: 30px 30px 0 0">
      <h3>1.Configure Clients</h3>

      <div class="menu">
        client number
        <el-input-number
          v-model="clientNum"
          controls-position="right"
          :min="1"
          :max="10"
          size="mini"
          @change="setprocess(0)"
          :disabled="isTraining"
        ></el-input-number>
      </div>

      <el-divider></el-divider>

      <h3>2.Post a Task</h3>

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
        dataset
        <el-select v-model="datasetvalue"
                   placeholder="select a dataset"
                   size="mini"
                   @change="setprocess(1)"
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

      <div class="menu">
        reward
        <el-input v-model="reward"
                  placeholder="reward for training"
                  clearable
                  size="mini"
                  maxlength="8"
                  style="width: 150px"
                  @focus="setprocess(1)"
                  :disabled="isTraining">
        </el-input>
      </div>

      <el-divider></el-divider>

      <h3 class="menu">3.Train Model <i class="el-icon-loading" v-show="isTraining"></i></h3>

      <div style="text-align: center;padding: 20px">
        <el-button type="success"
                   v-text="btnMsg"
                   @click="startTrain()"
                   :disabled="isTraining">
        </el-button>
      </div>

      <div>
        {{logtext}}
      </div>


    </el-aside>

    <el-container style="padding: 30px 50px">
      <el-header height="130px">
        <h3>Process</h3>
        <div>
          <el-steps :active=activestep finish-status="success" align-center>
            <el-step title="Configure Clients" description=""></el-step>
            <el-step title="Post a Task" description=""></el-step>
            <el-step title="Training" description=""></el-step>
            <el-step title="Computing Reward" description=""></el-step>
            <el-step title="Finish" description="" icon="el-icon-finished"></el-step>
          </el-steps>
        </div>
        <el-divider></el-divider>
      </el-header>
      <el-main style="border: lightgray dashed 1px;border-radius: 10px;background-color: #F5F5F5">
        <div style="display: flex;justify-content: flex-start;align-content: flex-start;flex-wrap: wrap">
          <Client v-for="(client,index) in clients" :key="index" :id=index :power=client.power
                  :readonly="isTraining" :result="result"></Client>
        </div>
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
  import Client from "../components/Client";
  import {run} from '../static/js/script.js'

  export default {
    name: "home",
    components: {
      Client
    },
    data() {
      return {

        activestep: 0,

        //client
        clientNum: 3,
        clients: [],

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

        reward: 100,

        btnMsg: 'start',

        isTraining: false,

        logtext: '',

        result: null
      }
    },
    created() {
      this.initClient()
    },
    watch: {
      clientNum: function () {
        this.initClient()
      },
      result: function () {
        this.logtext = 'build finished, start training...'
      }
    },
    methods: {
      initClient() {
        this.clients = new Array(this.clientNum).fill({power: 4})
      },
      setprocess(step) {
        this.activestep = step
      },
      async startTrain() {
        if (this.modelvalue === '') {
          this.$message.error('Please select a model.');
          return
        }

        if (this.datasetvalue === '') {
          this.$message.error('Please select a dataset.');
          return
        }

        this.setprocess(2)
        this.btnMsg = 'running'
        this.isTraining = true
        this.logtext = 'building...'
        this.result = await run()
      }
    }
  }
</script>

<style scoped>
  .menu {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center
  }

</style>
