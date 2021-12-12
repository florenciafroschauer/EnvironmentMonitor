// SE CORRE DESDE LA COMPU
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
var cors = require('cors')
app.use(cors())
const { Model } = require('objection')
const Knex = require('knex')
const Alert = require('./models/alert.js')
const Light = require('./models/light.js')
const Temp = require('./models/temp.js')
const Hum = require('./models/humidity.js')
app.use(express.json())

let stats_log = []
let stats = {}
let alertData = {}

// Coneccion con base de datos
const knex = Knex({
  client: 'pg',
  connection: {
   host : '127.0.0.1',
   user : 'testuser',
   password : 'password',
   database : 'postgres'
 }
});

// Give the knex instance to objection.
Model.knex(knex);

async function createSchema() {
  if (!(await knex.schema.hasTable('light'))) {
    // Create database schema.
    await knex.schema.createTable('light', table => {
      table.increments('id').primary()
      table.string('createdAt')
      table.float('light')
    });
  }

  if (!(await knex.schema.hasTable('temp'))) {
    await knex.schema.createTable('temp', table => {
      table.increments('id').primary()
      table.string('createdAt')
      table.integer('temp')
    });
  }

  if (!(await knex.schema.hasTable('hum'))) {
    await knex.schema.createTable('hum', table => {
      table.increments('id').primary()
      table.string('createdAt')
      table.integer('hum')
    });
  }

  // Se deben generar cuando la luz sobrepasa cierto nivel
  if (!await knex.schema.hasTable('alert')) {
    await knex.schema.createTable('alert', table => {
      table.increments('id').primary()
      table.string('type')
      table.string('title')
      table.string('msg')
      table.integer('lightId').references('light.id')
      table.boolean('state')
      table.string('createdAt')
    })
  }
}

async function main() {

    app.post('/stats', async (req, res) => {
      stats_log.push({
          createdAt: new Date().toLocaleTimeString(),
          temp:req.body.temp,
          humidity: req.body.humidity,
          light:req.body.light
        })

      stats = {temp: req.body.temp,
                humidity: req.body.humidity,
                light: req.body.light}

      const light = await Light.query().insert({
        createdAt: new Date().toLocaleTimeString(),
        light: stats.light
      })

      const hum = await Hum.query().insert({
        createdAt: new Date().toLocaleTimeString(),
        hum: stats.humidity
      })

      const temp = await Temp.query().insert({
        createdAt: new Date().toLocaleTimeString(),
        temp: stats.temp
      })

      if (stats.light < 30) {
        const alert = await Alert.query().insert({
          type: 'error',
          title: 'LUZ BAJA',
          msg: 'La sala tiene baja iluminacion.',
          lightId: light.id,
          state: 'false',
          createdAt: new Date().toLocaleTimeString()
        })
      }
      res.send(stats_log)
    })
}

app.post('/solved', async (req, res) => {
  console.log(req.body);

  const alert = await Alert.query()
    .where({ id: req.body.data.id })
    .update({ state: 'true' })

  res.send(req.body);
});


app.get('/light', async (req, res) => {
  const light = await Light.query()
    .orderBy('id')
    // .withGraphFetched('light')

  res.send({light})
})

app.get('/alert', async (req, res) => {
  const alert = await Alert.query()
    .orderBy('id')
    // .withGraphFetched('alert')

  res.send({alert})
})

app.get('/hum', async (req, res) => {
  const hum = await Hum.query()
    .orderBy('id')

  res.send({hum})
})

app.get('/temp', async (req, res) => {
  const temp = await Temp.query()
    .orderBy('id')

  res.send({temp})
})

createSchema()
  .then(() => main())
  .catch(err => {
    console.error(err)
    return knex.destroy()
  });

app.listen(port, () => {
  console.log('Monitor listening at http://192.168.0.21:3000')
})
