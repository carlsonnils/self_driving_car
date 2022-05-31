const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.93);

const n = 100;
const cars = generateCars(n);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")){

}

const traffic = [
    new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), -300, 30, 50, "DUMMY", 2),
];
animate();

function saveBestCar() {
    localStorage.setItem('bestBrain',
    JSON.stringify(bestCar.brain)
    );
}

function generateCars(n) {
    const cars = [];
    for (let i = 0; i < n; i++) {
        cars.push(new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), 100, 30, 50, "AI"));
    }

    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic);
    }
    const bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        )
    );

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.8);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "purple");
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++){
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);
    

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 75;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}