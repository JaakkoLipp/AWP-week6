"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
// Server HTTP Routing
app.get("/", (req, res) => {
    res.send("Index");
});
app.get("/hello", (req, res) => {
    const message = "Hello world";
    res.send(message);
});
// Arr to store vehicles from POST
let Garage = [];
// post route
app.post("/vehicle/add", (req, res) => {
    console.log("POST: " + JSON.stringify(req.body));
    let Vtype = "";
    let vehicle;
    // Handle Different Vehicle Types
    // car
    if ("wheelCount" in req.body) {
        Vtype = "car";
        vehicle = req.body;
        Garage.push(vehicle);
        // plane
    }
    else if ("wingspan" in req.body) {
        Vtype = "plane";
        vehicle = req.body;
        Garage.push(vehicle);
        // boat
    }
    else if ("draft" in req.body) {
        Vtype = "boat";
        vehicle = req.body;
        Garage.push(vehicle);
        //generic
    }
    else {
        vehicle = req.body;
        Garage.push(vehicle);
    }
    // debugging message
    console.log("Vehicle " + Vtype + " added" + JSON.stringify(Garage[Garage.length - 1]));
    //response
    res.send("Vehicle " + Vtype + " added").status(201);
});
// Model based GET search
app.get("/vehicle/search/:model", (req, res) => {
    const model = req.params.model;
    const matches = Garage.filter((vehicle) => {
        return vehicle.model === model;
    });
    if (matches.length > 0) {
        res.json(matches);
    }
    else {
        res.status(404).send("No vehicles found");
    }
});
// init server
app.listen(port, () => {
    console.log("server running at http://localhost:" + port);
});
