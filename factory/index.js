const CordinateSystem = {
    CARTESIAN: 0,
    POLAR: 1
};

class Point {

    //bad example, can't not modify the constructor to accept different parameters, because it will break the existing code that uses the class.
    // constructor(a, b, system = CordinateSystem.CARTESIAN) {
    //     switch (system) {
    //         case CordinateSystem.CARTESIAN:
    //             this.x = a;
    //             this.y = b;
    //             break;
    //         case CordinateSystem.POLAR:
    //             this.x = a * Math.cos(b);
    //             this.y = a * Math.sin(b);
    //             break;
    //     }
    // }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //can not do this
    // constructor(rho, theta) {
    //     this.x = rho * Math.cos(theta);
    //     this.y = rho * Math.sin(theta);
    // }

    //factory methods
    static newCartesianPoint(x, y) {
        return new Point(x, y);
    }

    static newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

let p1 = Point.newCartesianPoint(2, 3);
let p2 = Point.newPolarPoint(5, Math.PI / 2);
console.log(p1);
console.log(p2);