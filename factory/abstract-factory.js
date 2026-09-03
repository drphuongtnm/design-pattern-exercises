const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class HotDrink {
    consume() {}
}

class Tea extends HotDrink {
    consume() {
        console.log('This tea is nice with lemon!');
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log('This coffee is delicious!');
    }
}

class HotDrinkFactory {
    prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml, add lemon, enjoy!`);
        return new Tea();
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount}ml, add cream and sugar, enjoy!`);
        return new Coffee();
    }
}


//bad example of a factory that violates the Open/Closed Principle
//everytime we want to add a new drink, we have to modify the makeDrink method, which is not ideal.
class HotDrinkMachine {
    makeDrink(type) {
        switch(type) {
            case 'tea':
                return new TeaFactory().prepare(200);
            case 'coffee':
                return new CoffeeFactory().prepare(200);
            default:
                throw new Error('Unknown drink type');
        }
    }
}

// let machine = new HotDrinkMachine();
// rl.question('What drink would you like? (tea/coffee) ', function(answer) {
//     let drink = machine.makeDrink(answer);
//     drink.consume();

//     rl.close();
// });

let AvailableDrink = {
    tea: TeaFactory,
    coffee: CoffeeFactory
};

class HotDrinkMachine2 {
    constructor() {
        this.factories = {};
        for (let drink in AvailableDrink) {
            this.factories[drink] = new AvailableDrink[drink]();
        }
    }

    interact(consumer) {
        rl.question('Please specify drink and amount (e.g., tea 200) ', answer => {
            let [drink, amount] = answer.split(' ');
            amount = parseInt(amount);
            let d = this.factories[drink].prepare(amount);
            consumer(d);
            rl.close();
        });
    }
}

let machine2 = new HotDrinkMachine2();
machine2.interact(drink => {
    drink.consume();
});
