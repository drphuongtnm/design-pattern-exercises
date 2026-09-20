class ChiefExecutiveOfficer {

    // instead of storing the name and age in instance level, we store them at the class level (static properties)
    get name(){
        return ChiefExecutiveOfficer._name;
    }
    set name(value){
        ChiefExecutiveOfficer._name = value;
    }

    get age (){
        return ChiefExecutiveOfficer._age;
    }
    set age(value){
        ChiefExecutiveOfficer._age = value;
    }

    toString(){
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

ChiefExecutiveOfficer._name = '';
ChiefExecutiveOfficer._age = 0;

let ceo1 = new ChiefExecutiveOfficer();
ceo1.name = 'John Doe';
ceo1.age = 50;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'Jane Smith';
ceo2.age = 45;

console.log(ceo1.toString());
console.log(ceo2.toString());