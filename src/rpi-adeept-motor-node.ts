/* 
========================================================================= 
Copyright 2020 T-Mobile USA, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
See the LICENSE file for additional language around the disclaimer of warranties. Trademark Disclaimer: Neither the name of "T-Mobile, USA" nor the names of
its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 
================================
*/

import { Red, Node, NodeProperties } from "node-red";

export default function rpiAdeeptMotorNode(RED: Red) {
  function RpiAdeeptMotorNode(config: NodeProperties & { [key: string]: any }) {
    RED.nodes.createNode(this, config);

    const node = this as Node;

    this.input = config.input || 0;
    this.inputType = config.inputType || "number";

    // Output
    this.output = config.output || "payload";

    node.on("input", function (msg: any, send: { (msg: any): void }) {
      let wire1 = 0;
      let wire2 = 0;
      let pwm = 0;

      if (Number.isInteger(msg.payload)) {
        let powerInputValue = Math.abs(msg.payload);
        pwm = powerInputValue > 100 ? 100 : powerInputValue;
        if (msg.payload > 0)
          wire1 = 1;
        else
          wire2 = 1;
      } else {
        console.log(`Value must be a number. Value send is ${msg.payload}.`)
      }

      send([{ "payload": wire1 }, { "payload": wire2 }, { "payload": pwm }]);
    });
  }

  RED.nodes.registerType("rpi-adeept-motor", RpiAdeeptMotorNode);
}

module.exports = rpiAdeeptMotorNode;
