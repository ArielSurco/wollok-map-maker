let mapaWollok;

const crearPosicion = (x, y, offsetX=0, offsetY=0) => `game.at(${x + offsetX}, ${y + offsetY})`;
const crearFilaVacia = (width) => {
    const fila = [];
    for(let i=0; i<width; i++)
        fila.push(0);
    return fila;
}
const crearMapaVacio = (width, height) => {
    const mapa = [];
    for(let i=0; i<height; i++)
        mapa.push(crearFilaVacia(width));
    return mapa;
}
const agregarPosicionA = (mapa, {x, y}) => {
    mapa.forEach((filaActual, coordenadaY) => {
        filaActual.forEach((columnaActual, coordenadaX) => {
            if(coordenadaY == y && coordenadaX == x)
                mapa[coordenadaY][coordenadaX] = 1;
        })
    });
}


const Mapa = (mapa) => {
    const mapContainer = document.getElementById("map-container");
    mapContainer.innerHTML += TarjetaReversible();
}

const rotarTarjeta = (e) => {
    const tarjeta = e;
    const posicion = JSON.parse(e.getAttribute('id'));
    agregarPosicionA(mapaWollok, posicion);
    tarjeta.classList.toggle("reverse");
    console.log(mapaWollok);
}

const TarjetaReversible = (posicion) => {
    return (`
        <div class="reversible-card-container">
            <div class="reversible-card" onclick="rotarTarjeta(this)" id=${JSON.stringify(posicion)}>
                <div class="reversible-card__front"></div>
                <div class="reversible-card__back"></div>
            </div>
        </div>
    `)
}

const FilaDeTarjetasReversibles = (filaMapaWollok, coordenadaY) => {
    let filaHTML = '';
    filaMapaWollok.forEach((columna, coordenadaX) => {
        filaHTML += TarjetaReversible({x: coordenadaX, y: coordenadaY})
    })
    return (`
        <div class="fila-tarjetas" style="display:grid;grid-template-columns:repeat(${filaMapaWollok.length}, 20px);justify-content:center;gap:1px">
            ${filaHTML}
        </div>
    `)
}

const inicializarMapa = () => {
    const width = document.getElementById("input-width").value;
    const height = document.getElementById("input-height").value;
    const mapContainer = document.getElementById("map-container");
    mapaWollok = crearMapaVacio(width, height);
    for(let i=mapaWollok.length-1; i>=0; i--)
        mapContainer.innerHTML += FilaDeTarjetasReversibles(mapaWollok[i], i);
}

const resetearMapContainer = () => {
    document.getElementById("map-container").innerHTML = '';
}

const importarMapa = () => {
    let mapaAImportar = '[';
    mapaWollok.forEach((fila, posicionY) => {
        fila.forEach((columna, posicionX) => {
            if(mapaWollok[posicionY][posicionX] == 1)
                mapaAImportar += `${crearPosicion(posicionX, posicionY)}, `
        })
    })
    mapaAImportar += ']';
    navigator.clipboard.writeText(mapaAImportar)
        .then(() => alert("Mapa importado correctamente"));
    mapaWollok = [];
    //resetearMapContainer()
}