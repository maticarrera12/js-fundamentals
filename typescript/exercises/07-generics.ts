// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función genérica "last" que devuelva el último
//    elemento de un array. Si el array está vacío, devuelve undefined.
//    Tip: el tipo de retorno debería ser T | undefined.
// Tu código acá:

function last<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined
    } else {
        return array.at(-1);
    }
}
const arr = [2, 2, 3]
console.log(last(arr))

// 2. Escribí una función genérica "filterByProperty" que reciba:
//    - un array de T
//    - una key K (keyof T)
//    - un value del tipo T[K]
//    Y devuelva los elementos donde item[key] === value.
//    Ejemplo: filterByProperty(users, 'name', 'Matias')
// Tu código acá:

function filterByProperty<T, K extends keyof T>(items: T[], key: K, value: T[K]): T[] {

    return items.filter(item => item[key] === value)
}

// 3. Definí una interfaz genérica "Repository<T>" con estos métodos:
//    - findAll(): T[]
//    - findById(id: number): T | undefined
//    - save(item: T): void
//    - delete(id: number): void
//    Implementala con una clase "InMemoryRepository<T extends WithId>".
// Tu código acá:
interface WithId {
    id: number
}

interface Repository<T> {
    findAll(): T[]
    findById(id: number): T | undefined
    save(item: T): void
    delete(id: number): void
}

class InMemoryRepository<T extends WithId> implements Repository<T> {
    private items: T[] = []
    findAll(): T[] {
        return this.items
    }
    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id)
    }
    save(item: T): void {
        this.items.push(item)
    }
    delete(id: number): void {
      this.items = this.items.filter(item=> item.id !== id)
    }

}


// 4. Escribí una función genérica "pipe" que tome un valor inicial
//    de tipo T y un array de funciones (T => T), y aplique cada
//    función en orden al valor.
//    Ejemplo: pipe(5, [x => x * 2, x => x + 1]) → 11
// Tu código acá:

function pipe<T>(
  value: T,
  functions: ((value: T) => T)[]
): T {
  let result = value

  for (const fn of functions) {
    result = fn(result)
  }

  return result
}

console.log(pipe(5, [x => x * 2, x => x + 1]));
 
export { }
