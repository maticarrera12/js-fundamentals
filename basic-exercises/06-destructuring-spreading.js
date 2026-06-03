// Usa desestructuracion para extraer los dos primeros elementos de un array

// Asigna un valor predeterminado a una variable

const myNumberArray = [1,2,3]

const [firstNumber, secondNumber, , fourthNumber = 4] = myNumberArray

const newArray = [firstNumber, ...myNumberArray]

console.log(firstNumber, secondNumber, fourthNumber);


// Usa desestructuracion para extraer dos propiedades de un objeto

let buildingTalon = {
    firstObject: "Umbral Glaive",
    secondObject: "Voltaic Cyclosword",
    thirdObject: "Yuumu's Ghostblade"
}

const { firstObject, secondObject } = buildingTalon

console.log(firstObject + ", " + secondObject);

// Extraer ds propiedades y asignarles otr nombre

const { firstObject: firstBuy, thirdObject: thirdBuy} = buildingTalon

console.log(firstBuy + ", " + thirdBuy);

// Usa desestructuracion para extraer dos propiedades de un objeto anidado


let buildingTalonPlus = {
    core: {
        firstItem: "Umbral Glaive",
        secondItem: "Voltaic Cyclosword",
        thirdItem: "Yuumu's Ghostblade"
    },
    fourthItem: "Serylda's Grudge"
}

const {core:{firstItem, secondItem, thirdItem}} = buildingTalonPlus

console.log(firstItem, secondItem, thirdItem);

// Usa propagacion para combinar dos arrays en uno nuevo

const poolChampsMid = ["Talon", "Sylas", "Veigar"]
const poolChampsJungle = ["Shaco", "Vi", "Warwick"]

const poolChamps = [...poolChampsMid, ...poolChampsJungle]

console.log(poolChamps);

// Usa propagacion para crear una copia de un array

const poolChampsCopy =  [...poolChamps]

console.log(poolChampsCopy);

// Usa propagacion para combinar dos objetos en uno nuevo

const buildTalonDetail = {...buildingTalon, ...buildingTalonPlus}

console.log(buildTalonDetail);

// Usa propagacion para crear una copia de un objeto

const copyBuildTalon = {...buildTalonDetail}

// Combina desestructuracion y spread

const secondNumberArray = [1,2,3]

const [otherFirstNum, otherSecondNum, ...rest] = secondNumberArray;

const newRestArray = [otherFirstNum, ...rest];

console.log(newRestArray);