// ============================================================
// DESAFÍOS
// ============================================================

// 1. Implementá un "createLruCache(maxSize)" con Map que cuando
//    supera maxSize elimina la entrada MENOS recientemente usada.
//    Tip: Map conserva orden de inserción; map.delete + map.set
//    re-inserta al final. El primero de map.keys() es el más viejo.
// Tu código acá:


// 2. Esta función tiene DOS leaks. Encontralos y arreglala
//    devolviendo una función de cleanup:
//    function watchUser(user, element) {
//        setInterval(() => console.log(user.name), 1000)
//        element.addEventListener('mousemove', () => {
//            element.dataset.user = JSON.stringify(user)
//        })
//    }
// Tu versión arreglada acá:


// 3. Escribí "memoizeByObject(fn)" que cachee resultados de una
//    función que recibe UN objeto como argumento, usando WeakMap
//    para que el cache no impida que los objetos se liberen.
// Tu código acá:
