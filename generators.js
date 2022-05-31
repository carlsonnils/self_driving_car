// generate cars to self drive
function generateCars(n) {
    const cars = [];
    for (let i = 0; i < n; i++) {
        cars.push(new Car(road.getLaneCenter(Math.floor(Math.random() * 4)), 100, 30, 50, "AI"));
    }

    return cars;
}

// generate traffic for cars to avoid
function generateTraffic(n = 2, spawnDistance, carsY, trafficMaxSpeed, levels = 100) {
    const traffic = Array();
    for (let i = 0; i < levels; i++) {
        traffic[i] = [];
        for (let j = 0; j < n; j ++) {
            traffic[i].push(
                new Car(
                road.getLaneCenter(Math.floor(Math.random() * 4)),
                carsY + (spawnDistance * (i+1)),
                30,
                50,
                "DUMMY",
                trafficMaxSpeed
            ));
        }
    }
    console.log(traffic);
    return traffic;
}