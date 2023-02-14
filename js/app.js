
// VAriables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// console.log(max, min);

// console.log(resultado);


// Eventos
document.addEventListener('DOMContentLoaded', () =>{ 
    // muestra los automoviles al cargar
    mostrarAutos(autos);

    // Llena las opciones de años
    llenarSelect();

})

// Event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    // console.log(datosBusqueda);

    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    // console.log(datosBusqueda);

    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    // console.log(datosBusqueda);

    filtrarAuto();
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    // console.log(datosBusqueda);

    filtrarAuto();

})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt( e.target.value);
    // console.log(datosBusqueda);

    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    // console.log(datosBusqueda);

    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    // console.log(datosBusqueda);

    filtrarAuto();
})

// FUNCIONES
// El parametro autos viene de la funcion filtrarAutos, es un arreglo ya filtrado
function mostrarAutos(autos) {

    limpiarHTML(); // Elimina el HTML previo

    autos.forEach( auto => {
        const  { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // insertar en el HTML
        resultado.appendChild(autoHTML);
    })
    
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del Select
function llenarSelect () {
    for( let i = max; i >= min; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.append(opcion);
    }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );
    console.log(resultado);
    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    
}

function noResultado() {

    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados, Intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

// el auto se pasa automaticamente en la funcion filtrarAuto
function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if( marca ) {
        // filtra el que tenga la misma marca una vez que el usuario haya seleccionado algo
        return auto.marca === marca;
    }
    // si el usuario no ha seleccionado nada me retorna el automovil completo
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    // console.log(typeof year);
    // console.log(typeof auto.year);

    if( year ) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    // console.log(typeof year);
    // console.log(typeof auto.year);

    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;

    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;

    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;

    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;

    if( color ) {
        return auto.color === color;
    }
    return auto;
}