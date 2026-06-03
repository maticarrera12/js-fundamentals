import {Circle, PI, sum} from './18-export-modules.js'
import resta from './18-export-modules.js'


// nombrada
console.log(sum(2, 3));
console.log(PI);

// por defecto
console.log(resta(2,5));

// la importacion por defecto no necesita usar llaves para acceder a la función, clase o variable exportada, mientras que en la exportación nombrada sí es necesario usar llaves para acceder a cada elemento exportado. y no tiene que tener el mismo nombre que la función, clase o variable exportada.

// clase
let circle = new Circle(5)
console.log(circle.area());
console.log(circle.radius);

// solo podemos usar una importacion por defecto por archivo, pero podemos usar varias importaciones nombradas por archivo.
