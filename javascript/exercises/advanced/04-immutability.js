// ============================================================
// DESAFÍOS
// ============================================================

// 1. Sin mutar el array original, escribí "top3(products)" que
//    devuelva los 3 productos más caros ordenados de mayor a menor.
//    Verificá con console.log que el original quedó intacto.
// Tu código acá:


// 2. Dado este estado, escribí "markDone(state, taskId)" que devuelva
//    un estado NUEVO con la task marcada como done: true, reusando
//    (misma referencia) todo lo que no cambió:
//    const appState = {
//        user: { name: 'Matias' },
//        tasks: [
//            { id: 1, title: 'Estudiar JS', done: false },
//            { id: 2, title: 'Estudiar TS', done: false },
//        ],
//    }
//    Verificá: newState.user === appState.user debe ser true.
//    Tip: map + spread condicional en el item que matchea.
// Tu código acá:


// 3. Encontrá el bug de mutación y arreglalo de DOS formas
//    (toSorted, y copia previa con [...]):
//    function getMedian(numbers) {
//        const sorted = numbers.sort((a, b) => a - b)
//        return sorted[Math.floor(sorted.length / 2)]
//    }
// Tu código acá:
