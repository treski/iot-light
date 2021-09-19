const mqtt = require('mqtt'),
  mqttServer = 'mqtt://localhost:1883',
  lightId =  123,
  mqttTopic = `light/${lightId}`,
  client  = mqtt.connect(mqttServer)

client.on('connect', () => {
  client.subscribe(mqttTopic, (err) => {
    if(!err) {
        console.log(`CONNECTED TO ${mqttServer} and subscribed to ${mqttTopic}`)
    }
  })
})

client.on('message', (topic, message) => {
  const value = message.toString()

  if(value === 'true') {
      console.log('ENABLE LIGHT')
  } else if( value === 'false') {
      console.log('DISABLE LIGHT')
  } else {
      console.log('ERROR OCCURED')
  }
})