// ============================================================
// EJERCICIOS
// ============================================================

// 1. Definí una tupla "Coordinate" con [latitude: number, longitude: number].
//    Escribí una función "distance(a: Coordinate, b: Coordinate): number"
//    que calcule la distancia euclidiana entre dos puntos.
// Tu código acá:

type Coordinate = [latitude: number, longitud: number]

function calculateDistance(a: Coordinate, b: Coordinate): number {
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    return Math.sqrt(dx * dx + dy * dy)
}

const pointA: Coordinate = [10, 20]
const pointB: Coordinate = [30, 40]

console.log(calculateDistance(pointA, pointB))

// 2. Usando as const, definí un array TRAFFIC_LIGHTS con los colores del semáforo.
//    Extraé el tipo "TrafficLight" de ese array (debe ser union de literales).
//    Escribí una función que reciba TrafficLight y devuelva la acción: avanzar, frenar, etc.
// Tu código acá:

const TRAFFIC_LIGHTS = ["Rojo", "Amarillo", "Verde"] as const
type TrafficLight = typeof TRAFFIC_LIGHTS[number]

function action(trafficLight: TrafficLight): string {
    switch (trafficLight) {
        case "Rojo":
            return "Frenar";
        case "Amarillo":
            return "Esperar";
        case "Verde":
            return "Avanzar";
        default:
            const _exhaustive: never = trafficLight
            return _exhaustive
    }
}

const res = action("Verde")
console.log(res)

// 3. Definí un enum "JobRole" con: Frontend, Backend, Fullstack, DevOps, QA, Designer.
//    Definí un type "Employee" con name (string), role (JobRole) y seniority ('junior' | 'mid' | 'senior').
//    Escribí una función que reciba Employee[] y devuelva los empleados agrupados
//    por rol: Record<JobRole, Employee[]>.
// Tu código acá:

enum JobRole {
    Frontend = "Frontend",
    Backend = "Backend",
    Fullstack = "Fullstack",
    DevOps = "DevOps",
    QA = "QA",
    Designer = "Designer"
}

type Employee = {
    name: string
    role: JobRole
    seniority: "junior" | 'mid' | 'senior'
}

function groupByRole(employees: Employee[]): Record<JobRole, Employee[]> {
    const grouped: Record<JobRole, Employee[]> = {
        Frontend: [],
        Backend: [],
        Fullstack: [],
        DevOps: [],
        QA: [],
        Designer: []
    }
    for (const emp of employees) {
        grouped[emp.role].push(emp)
    }

    return grouped
}
export { }


// Si llega este empleado:
// {
//     name: "Matias",
//     role: JobRole.Frontend,
//     seniority: "mid"
// }
// ¿qué expresión te permite acceder al array de Frontend dentro de grouped usando el valor de employee.role? Esa expresión es la clave del algoritmo. 🚀