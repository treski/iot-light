#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
// if we want to be secure, we can put secrets in here (wifi creds)
//#include "arduino_secrets.h"

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = "RFN 2.4Ghz";        // your network SSID
char pass[] = "MCERT522";    // your network password

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "52.201.245.140";
int        port     = 1883;
const char topic[]  = "light/123";
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  // attempt to connect to Wifi network:
  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  // set the message receive callback
  mqttClient.onMessage(onMqttMessage);

  Serial.print("Subscribing to topic: ");
  Serial.println(topic);
  Serial.println();

  // subscribe to a topic
  mqttClient.subscribe(topic);

  Serial.print("Topic: ");
  Serial.println(topic);

  Serial.println();
}

void loop() {
  // call poll() regularly to allow the library to receive MQTT messages and
  // send MQTT keep alives which avoids being disconnected by the broker
  mqttClient.poll();
}

void onMqttMessage(int messageSize) {
  // we received a message, print out the topic and contents
  Serial.print("Received a message with topic: ");
  Serial.print(mqttClient.messageTopic());
  String message  = "";
  
  // use the Stream interface to print the contents
  while (mqttClient.available()) {
    message = mqttClient.readString();
  }

  if(message == "true"){
    Serial.println("\nTurn on the light!");
    // turn the LED on (HIGH is the voltage level)
    digitalWrite(LED_BUILTIN, HIGH);
  } else if(message == "false"){
    Serial.println("\nTurn off the light!");
    // turn the LED on (HIGH is the voltage level)
    digitalWrite(LED_BUILTIN, LOW);
  }
  
  Serial.println();
  Serial.println();
}
