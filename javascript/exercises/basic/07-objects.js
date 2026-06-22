

// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "merge(obj1, obj2)" que combine dos objetos.
//    Las propiedades de obj2 deben sobrescribir las de obj1 si hay conflicto.
//    Hacelo sin mutar ninguno de los dos originales.
// Tu código acá:

function merge(obj1, obj2){
    return {...obj1, ...obj2}
}

// 2. Dado el objeto product:
const product = {
    id: 1,
    name: 'Laptop',
    price: 85000,
    specs: {
        ram: '16GB',
        storage: '512GB SSD',
        display: {
            size: '15.6"',
            resolution: '1920x1080'
        }
    }
}
//    usá Object.entries y reduce para construir un nuevo objeto donde cada clave sea la misma
//    pero todos los valores string estén en mayúsculas.
//    (las specs anidadas pueden quedar igual por ahora)
// Tu código acá:




// 3. Implementá una función "pick(obj, keys)" que devuelva un nuevo objeto
//    con solo las propiedades cuyas claves están en el array keys.
//    pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) → { a: 1, c: 3 }
// Tu código acá:
