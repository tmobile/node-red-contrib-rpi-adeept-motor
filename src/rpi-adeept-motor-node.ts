/**
Copyright 2020 T-Mobile USA, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

See the LICENSE file for additional language around the disclaimer of warranties.
Trademark Disclaimer: Neither the name of “T-Mobile, USA” nor the names of
its contributors may be used to endorse or promote products
*/

import { Red, Node, NodeProperties } from "node-red";

function getValue(payload: any, motorSelect: string) {
  let value = payload[motorSelect];  //Assume it's a json

  if (!value) value = payload; //if null then it's not a json, Assume it's a number

  if (Number.isInteger(value)) return value;

  console.log(`Value must be a number. Value send is ${value}.`)

  return 0; //0 - does nothing
}

function getJsonArray(value: number) {
  let wire1 = 0;
  let wire2 = 0;
  let pwm = 0;

  if (value != 0) {
    let powerInputValue = Math.abs(value);
    pwm = powerInputValue > 100 ? 100 : powerInputValue;
    if (value > 0)
      wire1 = 1;
    else
      wire2 = 1;
  }

  return [{ "payload": wire1 }, { "payload": wire2 }, { "payload": pwm }];
}
export default function rpiAdeeptMotorNode(RED: Red) {
  function RpiAdeeptMotorNode(config: NodeProperties & { [key: string]: any }) {
    RED.nodes.createNode(this, config);

    const node = this as Node;

    this.input = config.input || 0;
    this.inputType = config.inputType || "number";
    this.motorSelect = config.motorSelect

    // Output
    this.output = config.output || "payload";

    node.on("input", function (msg: any, send: { (msg: any): void }) {
      let value = getValue(msg.payload, this.motorSelect);
      let jsonArray = getJsonArray(value)
      send(jsonArray);
    });
  }

  RED.nodes.registerType("rpi-adeept-motor", RpiAdeeptMotorNode);
}

module.exports = rpiAdeeptMotorNode;
