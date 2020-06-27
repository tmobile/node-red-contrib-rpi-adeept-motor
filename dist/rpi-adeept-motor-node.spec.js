"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rpi_adeept_motor_node_1 = __importDefault(require("./rpi-adeept-motor-node"));
var node_red_node_test_helper_1 = __importDefault(require("node-red-node-test-helper"));
var chai_1 = require("chai");
node_red_node_test_helper_1.default.init(require.resolve("node-red"));
describe("The Differences Node", function () {
    // beforeEach(function (done) {
    //   helper.startServer(done);
    // });
    afterEach(function (done) {
        node_red_node_test_helper_1.default.unload();
        done();
        // helper.stopServer(done);
    });
    var flow = [
        {
            id: "n1",
            type: "rpi-adeept-motor",
            leftInput: "left",
            leftInputType: "msg",
            rightInput: "right",
            rightInputType: "msg",
            func: "-",
            outputType: "msg",
            output: "payload",
            wires: [["n2"]],
        },
        { id: "n2", type: "helper" },
    ];
    it("should be loaded", function (done) {
        node_red_node_test_helper_1.default.load(rpi_adeept_motor_node_1.default, flow, function () {
            try {
                var n1 = node_red_node_test_helper_1.default.getNode("n1");
                chai_1.expect(n1.type).to.equal("rpi-adeept-motor");
                done();
            }
            catch (err) {
                done(err);
            }
        });
    });
});
