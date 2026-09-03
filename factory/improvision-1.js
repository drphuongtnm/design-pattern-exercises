const CordinateSystem = {
    CARTESIAN: 0,
    POLAR: 1
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class PointFactory {

    //remove static will make the method an instance method, 
    // which means you will need to create an instance of the class to use it. 
    // This is not what we want for a factory method, which should be callable without creating an instance of the class.
    static newCartesianPoint(x, y) {
        return new Point(x, y);
    }

    static newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

let p1 = PointFactory.newCartesianPoint(2, 3);
let p2 = PointFactory.newPolarPoint(5, Math.PI / 2);
console.log(p1);
console.log(p2);