

// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado: 
const userType = 'vip'
const total = 900
//    Usando if/else, calculá e imprimí el precio final aplicando el descuento:
//    - 'vip': 20% si total > 1000, si no 10%
//    - 'member': 5%
//    - cualquier otro: 0%
//    (Probá cambiando userType y total a mano y volvé a correr.)
// Tu código acá:

if (userType === 'vip') {
    if (total > 1000) {
        console.log(`El total es ${total * 0.80}`)
    } else {
        console.log(`El total es ${total * 0.90}`);
    }
} else if (userType === 'member') {
    console.log(`El total es ${total * 0.95}`);
}else{
    console.log(`El total es ${total}`);
}



// 2. Dado: 
const day = 3 
//    Usando switch, imprimí 'Finde' si es sábado o domingo, y 'Laborable'
//    en cualquier otro caso. Aprovechá el fallthrough para agrupar los days.
//    (Probá cambiando day.)
// Tu código acá:

switch(day){
    case 1: case 2: case 3: case 4 : case 5:
        console.log("Laborable")
        break
    case 0: case 6:
        console.log("Finde");
        break
    default:
        console.log("Inserte el dia por su numero.");
        
         
}
