import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: number = 3000;
app.use(express.json());

// creating interfaces for all vehicles

interface Vehicle {
  model: String;
  color: String;
  year: Number;
  power: Number;
}
interface Car extends Vehicle {
  bodyType: String;
  wheelCount: Number;
}
interface Plane extends Vehicle {
  wingspan: Number;
}
interface Boat extends Vehicle {
  draft: Number;
}

// type union   adding base type also
type AnyVehicle = Car | Boat | Plane | Vehicle;

// Server HTTP Routing

app.get("/", (req: Request, res: Response) => {
  res.send("Index");
});

app.get("/hello", (req: Request, res: Response) => {
  const message: String = "Hello world";
  res.send(message);
});

// Arr to store vehicles from POST
let Garage: AnyVehicle[] = [];

// post route
app.post("/vehicle/add", (req: Request, res: Response) => {
  console.log("POST: " + JSON.stringify(req.body));

  let Vtype: String = "";
  let vehicle: AnyVehicle;

  // Handle Different Vehicle Types
  // car

  if ("wheelCount" in req.body) {
    Vtype = "car";
    vehicle = req.body;
    Garage.push(vehicle);

    // plane
  } else if ("wingspan" in req.body) {
    Vtype = "plane";
    vehicle = req.body;
    Garage.push(vehicle);

    // boat
  } else if ("draft" in req.body) {
    Vtype = "boat";
    vehicle = req.body;
    Garage.push(vehicle);

    //generic
  } else {
    vehicle = req.body;
    Garage.push(vehicle);
  }

  // debugging message
  console.log(
    "Vehicle " + Vtype + " added" + JSON.stringify(Garage[Garage.length - 1])
  );

  //response
  res.send("Vehicle " + Vtype + " added").status(201);
});

// Model based GET search
app.get("/vehicle/search/:model", (req: Request, res: Response) => {
  const model: String = req.params.model;

  const matches: AnyVehicle[] = Garage.filter((vehicle) => {
    return vehicle.model === model;
  });
  if (matches.length > 0) {
    res.json(matches);
  } else {
    res.status(404).send("No vehicles found");
  }
});

// init server
app.listen(port, () => {
  console.log("server running at http://localhost:" + port);
});
