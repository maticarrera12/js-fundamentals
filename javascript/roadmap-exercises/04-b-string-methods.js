 /*
 * DIFICULTAD EXTRA (opcional):
 * Crea un programa que analice dos palabras diferentes y realice comprobaciones
 * para descubrir si son:
 * - Palíndromos
 * - Anagramas
 * - Isogramas 
 */
const check = (word1, word2) => {
    // palindromos
    console.log(`¿${word1} es un palíndromo? ${word1.toLowerCase() === word1.toLowerCase().split('').reverse().join('')}`);
    console.log(`¿${word2} es un palíndromo? ${word2.toLowerCase() === word2.toLowerCase().split('').reverse().join('')}`);


    const clean = (str) => str.toLowerCase().replace(/\s+/g, '');
    const w1 = clean(word1);
    const w2 = clean(word2);

    // anagramas
    // 
    if (w1.length !== w2.length) {
        console.log("No son anagramas (tienen longitudes distintas)");
    } else {
        const orderString = (str) => str.split('').sort().join('');
        
        if (orderString(w1) === orderString(w2)) {
            console.log("Son anagramas");
        } else {
            console.log("No son anagramas");
        }
    }

    // isogramas
  
    console.log(`¿${word1} es un isograma? ${w1.length === new Set(w1).size}`);
    console.log(`¿${word2} es un isograma? ${w2.length === new Set(w2).size}`);
}

// test
console.log("--- TEST 1 ---");
check("radar", "avion");

console.log("\n--- TEST 2 ---");
check("amor", "romaa");