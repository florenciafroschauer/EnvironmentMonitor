const { requestI2CAccess } = require("node-web-i2c");
const PCF8591 = require("@chirimen/pcf8591");
const { promisify, isObject } = require("util");
const sleep = promisify(setTimeout);
const axios = require('axios');
const Gpio = require('onoff').Gpio;
var sensor = require("node-dht-sensor");
const pcf8591 = require("@chirimen/pcf8591");
const { truncate } = require("fs/promises");
let light = null
let temp = null
let hum = null
let title = ""
let msg = ""
let type = ''

loop()

async function outputStats(pcf8591) {
  sensorData = sensor.read(11, 14)
  temp = sensorData.temperature
  hum = sensorData.humidity

  light = await pcf8591.readADC(1)
  light = translate(light, 5, 0, 0, 100)

  console.log(`temp: ${temp}°C, humidity: ${sensorData.humidity}%, Light:${light.toFixed(3)}%`)

  axios({
    method: 'post',
    url: 'http://192.168.0.21:3000/stats',
    data: {
      temp: sensorData.temperature,
      humidity: sensorData.humidity,
      light: light.toFixed(3)
    }
  });
}

async function generateAlert() {
  title = ""
  msg = ""
  type = ""

  if(light < 30) {
    title = "LUZ BAJA"
    msg = "La sala esta muy oscura"
    type = "error"
    console.log(msg)
  }
}

async function loop() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const pcf8591 = new PCF8591(port, 0x48);
  await pcf8591.init();

  while (true) {

    outputStats(pcf8591)
    generateAlert()

    await sleep(1000);

  }
}

function translate(value, leftMin, leftMax, rightMin, rightMax) {
  let leftSpan = leftMax - leftMin
  let rightSpan = rightMax - rightMin

  let valueScaled = parseFloat(value - leftMin) / parseFloat(leftSpan)

  return rightMin + (valueScaled * rightSpan)
}
