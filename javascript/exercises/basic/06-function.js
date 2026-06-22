

// ============================================================
// EJERCICIOS
// ============================================================

// 1. Escribí una función "repeat(fn, times)" que ejecute fn
//    la cantidad de veces especificada, pasándole el número
//    de iteración (0-based). Usala con console.log.
// Tu código acá:


function repeat(fn, times, i = 0) {
  if (i >= times) {
    return;
  }

  fn(i);
  repeat(fn, times, i + 1);
}

// 2. Escribí una función "compose(f, g)" que devuelva una nueva
//    función que aplique primero g y luego f (composición matemática).
//    Ejemplo: compose(double, addOne)(3) → double(addOne(3)) → 8
// Tu código acá:

const compose = (f, g) => value => f(g(value));


// 3. Escribí una función "formatPrice(amount, currency = 'USD')" que
//    devuelva un string tipo '100 USD' usando un template literal.
//    Probala con un solo argumento y con los dos, para ver el parámetro
//    por defecto en acción.

const formatPrice = (amount, currency = "USD") => `${amount} ${currency}`

console.log(formatPrice(100));
console.log(formatPrice(200, "EUR"));

// Tu código acá:
