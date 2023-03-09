class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return 'beep';
    }

    toString() {
        return `the vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return 'vroom';
    }
}

class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(newVehicle) {
        if (!(newVehicle instanceof Vehicle)) {
            return "must be a vehicle!";
        }
        if (this.vehicles.length >= this.capacity) {
            return 'Sorry, we are full!';
        }
        this.vehicles.push(newVehicle);
        return 'Vehicle added!'
    }
}