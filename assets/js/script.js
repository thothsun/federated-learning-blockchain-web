import {MnistData} from './data.js';
import * as tf from '@tensorflow/tfjs';


function getModel() {
  const model = tf.sequential();

  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const IMAGE_CHANNELS = 1;

  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  model.add(tf.layers.flatten());

  const NUM_OUTPUT_CLASSES = 10;
  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}

async function train(model, data) {
  const BATCH_SIZE = 32;
  const TRAIN_DATA_SIZE = 5500;
  const TEST_DATA_SIZE = 1000;

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [
      d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 10,
    shuffle: true
  });
}

// async function run() {
//   console.log('start run...')
//   const data = new MnistData();
//   await data.load();
//
//   const model = getModel();
//   let history = await train(model, data);
//   // console.log(history.history.val_loss)
//   // console.log(history.history.val_acc)
//   // console.log(history.history.loss)
//   // console.log(history.history.acc)
//   console.log('end run!')
//   console.log(typeof history.history.loss)
//   console.log(typeof history.history.acc)
//   console.log([history.history.loss, history.history.acc])
//   return [history.history.loss, history.history.acc]
// }

function run() {
  let loss = [
    0.9090158939361572,
    0.27688756585121155,
    0.19303062558174133,
    0.15251964330673218,
    0.12046714872121811,
    0.10329486429691315,
    0.08631346374750137,
    0.07405736297369003,
    0.06184576824307442,
    0.05369441211223602]
  let acc = [
    0.7398181557655334,
    0.9138181805610657,
    0.9407272338867188,
    0.95127272605896,
    0.9638181328773499,
    0.9701818227767944,
    0.9734545350074768,
    0.9778181314468384,
    0.9799999594688416,
    0.9834545254707336]

  return [loss, acc]

}

export {
  run
}

