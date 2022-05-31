const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// intialize the Road 
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.93);

// intialize the cars
const n = 100;
const cars = generateCars(n);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {

}

// intialize the traffic
// const trafficMaxSpeed = 2;
// const spawnDistance = -200;
// let carsY = cars[0].y;
// const traffic = [
//     new Car(
//         road.getLaneCenter(Math.floor(Math.random() * 4)),
//         carsY + spawnDistance,
//         30,
//         50,
//         "DUMMY",
//         trafficMaxSpeed
//     ),
//     new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), -300, 30, 50, "DUMMY", trafficMaxSpeed),
//     new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), -300, 30, 50, "DUMMY", trafficMaxSpeed),
// ];

// animate the road and cars
animate();

// save the best car
function saveBestCar() {
    localStorage.setItem('bestBrain',
        JSON.stringify(bestCar.brain)
    );
}