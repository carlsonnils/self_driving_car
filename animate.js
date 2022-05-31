// animate the road with the cars and traffic
function animate(time) {
    
    const bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        )
    );
    
    const carY = bestCar.y;
    const trafficMaxSpeed = 2;
    const spawnDistance = -200;
    const traffic = generateTraffic(2, spawnDistance, carY, trafficMaxSpeed, 50)
    console.log(traffic)
    
    if (carY % spawnDistance < 5) {
        console.log(true)
    }

    for (let i = 0; i < traffic.length; i++) {
        for (let j = 0; j < traffic[i].length; j++){
            traffic[i][j].update(road.borders, []);
        }
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.8);

    road.draw(carCtx);

    for (let i = 0; i < traffic.length; i++) {
        for (let j = 0; j < traffic[i]/length; j++){
            traffic[i][j].draw(carCtx, "purple");
        }
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);


    carCtx.restore();

    networkCtx.lineDashOffset = -time / 75;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}