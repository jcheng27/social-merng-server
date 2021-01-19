// https://www.javascripttutorial.net/javascript-bind/
// https://www.codingame.com/playgrounds/9799/learn-solve-call-apply-and-bind-methods-in-javascript
// https://dev.to/thesanjeevsharma/call-apply-and-bind-in-javascript-2nno

var car = { 
    registrationNumber: "GA12345",
    brand: "Toyota",

    displayDetails: function(ownerName){
        console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
    }
}

const jethroCar = { registrationNumber: "CHJZ782", brand: "Honda" }

const dadCar = { registrationNumber: "AAPF523", brand: "Accord"}

//Bind returns a function, that you can pass argument into
mycar = car.displayDetails.bind(jethroCar)
mycar("Jethro")

//Call automatically returns
car.displayDetails.call(dadCar, "Dad")
