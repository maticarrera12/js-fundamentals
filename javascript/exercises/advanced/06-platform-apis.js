// ============================================================
// DESAFÍOS
// ============================================================

// 1. Escribí "buildApiUrl(base, path, filters)" donde filters es un
//    objeto que puede tener valores array: { tag: ['a','b'], page: 2 }
//    → base + path + '?tag=a&tag=b&page=2'. Usá URL + searchParams
//    (append para los arrays). Nada de concatenar strings.
// Tu código acá:


// 2. Ampliá el wrapper "storage" con:
//    - setWithExpiry(key, value, ttlMs): guarda { value, expiresAt }
//    - get debe devolver fallback si la entrada expiró (y limpiarla)
//    Probalo guardando algo con TTL de 1 segundo.
// Tu código acá:


// 3. (Browser) Armá un formulario HTML con email + 2 checkboxes del
//    mismo name, y un script que al submit: prevenga el default,
//    lea TODO con FormData, valide que haya al menos un checkbox
//    marcado, y muestre el objeto final con console.table.
// Tu código acá (o en un .html aparte):
