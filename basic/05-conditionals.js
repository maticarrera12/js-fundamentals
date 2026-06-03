// if, else if, else

// if (condition) 

let age = 37;

if (age >= 18) {
    console.log("You are an adult.");
}

// if (condition) { ... } else { ... }

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// if (condition) { ... } else if (condition) { ... } else { ... }
let time = 14;

if (time < 12) {
    console.log("Good morning!");
} else if (time < 18) {
    console.log("Good afternoon!");
} else {
    console.log("Good evening!");
}


// operador ternario

let isAdult = age >= 18 ? "Yes" : "No";
console.log(isAdult); // "Yes"

// switch revisar condiciones que se verifican contra una misma variable, se puede usar para reemplazar if-else if-else cuando se tienen muchas condiciones que verificar contra la misma variable, tiene la sintaxis: switch (variable) { case valor1: ... break; case valor2: ... break; ... default: ... }

let day = 0
let dayName; 

switch (day) {
    case 0:
        dayName = "Sunday";
        break;
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    default:
        dayName = "Invalid day";
}
console.log(dayName);

// el switch es muy leible, es muy eficiente, sus limitaciones es que es menos flexible que el if-else, no se pueden usar operadores de comparación, no se pueden usar condiciones complejas, no se pueden usar variables en los casos, etc.