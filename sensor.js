class Sensor {
    constructor(car) {
        // inttialize variables
        this.car = car;
        this.rayCount = 11;
        this.rayLength = 300;
        this.raySpread = Math.PI * 1.25;

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic) {
        this.castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.getReading(this.rays[i], roadBorders, traffic)
            );
        }
    }

    getReading(ray, roadBorders, traffic) {
        let touches = [];

        // get the intersection of a ray with the edge of the road
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if (touch) {
                touches.push(touch);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;
            for (let j = 0; j < poly.length; j++) {
                const val = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j + 1) % poly.length]
                );
                if (val) {
                    touches.push(val);
                }
            }
        }

        // find the shortest distance (offset) to a edge
        if (touches.legnth == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }

    castRays() {
        // build the sensor rays
        this.rays = []

        // iterate through the amount of rays and build a sensor ray between the specified FOV
        for (let i = 0; i < this.rayCount; i++) {
            // divide the FOV into equal parts for the rays
            const rayAngle = lerp(
                this.raySpread / 2, -this.raySpread / 2,
                this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
            ) + this.car.angle; // add the car angle to make the rays stay in the same diraction as the car
            // specify the start and end point of each aray to draw
            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };

            // push the start and end points to the arrays
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {

        for (let i = 0; i < this.rayCount; i++) {

            // draw the readings
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }

            // draw the sensor to contact point
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            // draw sensor from contact point to the end of the sensor ray
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }

}