/*
 *DIFICULTAD EXTRA (opcional):
 *
 * Crea una agenda de contactos por terminal.
 * - Debes implementar funcionalidades de búsqueda, inserción, actualización y eliminación de contactos.
 * - Cada contacto debe tener un nombre y un número de teléfono.
 * - El programa solicita en primer lugar cuál es la operación que se quiere realizar, y a continuación los datos necesarios para llevarla a cabo.
 * - El programa no puede dejar introducir números de teléfono no numéricos y con más de 11 dígitos (o el número de dígitos que quieras).
 * - También se debe proponer una operación de finalización del programa.
 */
// agenda por terminal
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function myAgenda() {
  let agenda = new Map();
  agenda = new Map([["juan", "11547939569"]]);

  let operation = await rl.question(
    "Introduce la operación que quieres realizar: ",
  );
if (operation === "5") {
  console.log("Saliendo de la agenda.");
  return;
}
  while (operation !== "5") {
    console.log("Bienvenido a tu agenda de contactos");
    console.log(
      "¿Qué operación quieres realizar?  \n ======Agenda======== \n 1. Buscar, \n 2. Insertar, \n 3. Actualizar, \n 4. Eliminar, \n 5. Finalizar",
    );
    switch (operation) {
      case "1":
        const nameToSearch = await rl.question(
          "Introduce el nombre del contacto que quieres buscar: ",
        );
        if (agenda.has(nameToSearch.toLowerCase())) {
          console.log(agenda.get(nameToSearch));
        } else {
          console.log("Contacto no encontrado");
        }
        break;
      case "2":
        const name = await rl.question("Introduce el nombre del contacto: ");
        const phone = await rl.question("Introduce el celular del contacto: ");
        if (phone.length <= 11 && /^\d+$/.test(phone)) {
          agenda.set(name, phone);
        }
        break;
      case "3":
        const nameToUpdate = await rl.question(
          "Con el nombre del contacto podes modificar el celular: ",
        );
        if (agenda.has(nameToUpdate)) {
          let phoneUpdate = await rl.question("Introduce el nuevo celular: ");
          while (phoneUpdate.length > 11 || !/^\d+$/.test(phoneUpdate)) {
            phoneUpdate = await rl.question(
              "Debe ser numerico y menor a 12 digitos. Introduce el nuevo celular: ",
            );
          }
          agenda.set(nameToUpdate, phoneUpdate);
          console.log([...agenda]);
        } else {
          console.log("No se encontro el contacto.");
        }
        break;
      case "4":
        const nameToDelete = await rl.question(
          "Introduce el contacto a eliminar: ",
        );

        if (agenda.has(nameToDelete.toLowerCase())) {
          agenda.delete(nameToDelete);
        } else {
          console.log("Contacto no encontrado");
        }
        break
      case "5":
        console.log("Saliendo de la agenda.");
        break;
      default:
        operation = await rl.question(
          "Introduce la operación que quieres realizar: ",
        );
    }
  }
}
myAgenda();
