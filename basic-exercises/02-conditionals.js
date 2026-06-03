// 1
let myName = "matias"

if (myName === "matias") {
    console.log("Hello, Matias!");
}

// 2

let user = "admin";
let password = "1234";
if (user === "admin" && password === "1234") {
    console.log("Access granted.");
}

// 3
let number = 10;

if (number > 0) {
    console.log("The number is positive.");
}else if (number < 0) {
    console.log("The number is negative.");
} else {
    console.log("The number is zero.");
}

let otherAge = 15
if (otherAge < 18) {
    console.log("You cannot vote.");
    console.log(`You need ${18 - otherAge} more years to vote.`);
}

// 5

let age = 25;
let isAdult = age >= 18 ? "Yes" : "No";
console.log(isAdult); // "Yes"

// 6

let month = "September";

if (month === "December" || month === "January" || month === "February") {
    console.log("It's Summer.");
}else if (month === "March" || month === "April" || month === "May") {
    console.log("It's Autumn.");
} else if (month === "June" || month === "July" || month === "August") {
    console.log("It's Winter.");
} else {
    console.log("It's Spring.");
}

// 7

if (month === "January" || month === "March" || month === "May" || month === "July" || month === "August" || month === "October" || month === "December") {
    console.log("It has 31 days.");
} else if (month === "April" || month === "June" || month === "September" || month === "November") {
    console.log("It has 30 days.");
} else {
    console.log("It has 28 days (or 29 in a leap year).");
}

// 8

let language = "Spanish";

switch (language) { 
    case "English":
        console.log("Hello!");
        break;
    case "Spanish":
        console.log("¡Hola!");
        break;
    default:
        console.log("Chiao!");
}


// 9

switch (month){
    case "December":
    case "January":
    case "February":
        console.log("It's Summer.");
        break;
    case "March":
    case "April":
    case "May":
        console.log("It's Autumn.");
        break;
    case "June":
    case "July":
    case "August":
        console.log("It's Winter.");
        break;
    default:
        console.log("It's Spring.");
}

//10

switch (month){
    case "January":
    case "March":
    case "May":
    case "July":
    case "August":
    case "October":
    case "December":
        console.log("It has 31 days.");
        break;
    case "April":
    case "June":
    case "September":
    case "November":
        console.log("It has 30 days.");
        break;
    default:
        console.log("It has 28 days (or 29 in a leap year).");
}