window.addEventListener("load", inicioJuego)
let jugadorId = null
let mokepones = []
let mokeponesEnemigos = []
let opcionDeMokepones
let ataqueJugador = []
let ataqueRival = []
let victoriaJugador = 0
let victoriaRival = 0
let batalla = ""
let botonHipodoge
let botonCapipepo 
let botonRatigueya 
let mascotaJugador
let ataqueMascotaJugador
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let ataqueMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueRival
let intervalo
let mascotaJugadorObjeto
let alturaOptima
let anchoMapa


const anchoMaximo = 350
const contenedor = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascota = document.getElementById("boton-Mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("span-Mascota-Jugador")

const spanMascotaRival = document.getElementById("span-Mascota-Rival")

const sectionMensaje = document.getElementById("mensaje-resultado")
const AtaqueDelJugador = document.getElementById("ataque-jugador")
const AtaqueDelRival = document.getElementById("ataque-rival")

const spanVidasJugador = document.getElementById ("vida-Mascota-Jugador")
const spanVidasRival = document.getElementById ("vida-Mascota-Rival")
const sectionMapa = document.getElementById("section-mapa")
const canvas = document.getElementById("mapa")
const ctx = canvas.getContext("2d")
const mapaBackground = new Image ()
mapaBackground.src = '../css/mokemap.png'

class Mokepon {
    constructor(nombre, imagen, vida, foto, id = null) {
        this.id = id
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.ancho = 20
        this.alto = 20
        this.x = aleatorio(0, canvas.width - this.ancho)
        this.y = aleatorio(0, canvas.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    aparecerMokepones() {
        ctx.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho
        )
    }
}
let hipodoge = new Mokepon ('Hipodoge', '../css/mokepons_mokepon_hipodoge_attack.png', 5, '../css/hipodoge.png')
let capipepo = new Mokepon ('Capipepo', '../css/mokepons_mokepon_capipepo_attack.png', 5, '../css/capipepo.png')
let ratigueya = new Mokepon ('Ratigueya', '../css/mokepons_mokepon_ratigueya_attack.png', 5, '../css/ratigueya.png')
let hipodogeEnemigo = new Mokepon ('Hipodoge', '../css/mokepons_mokepon_hipodoge_attack.png', 5, '../css/hipodoge.png')
let capipepoEnemigo = new Mokepon ('Capipepo', '../css/mokepons_mokepon_capipepo_attack.png', 5, '../css/capipepo.png')
let ratigueyaEnemigo = new Mokepon ('Ratigueya', '../css/mokepons_mokepon_ratigueya_attack.png', 5, '../css/ratigueya.png')
hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)
mokepones.push(hipodoge, capipepo, ratigueya)


function inicioJuego () {
    sectionSeleccionarAtaque.style.display = "none"    
    sectionReiniciar.style.display = "none"
    sectionMapa.style.display = "none"

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `<input type="radio" name="mascota" id=${Mokepon.nombre} />
        <label class="tarjeta" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.imagen} alt=${Mokepon.nombre}>
        </label>`
        contenedor.innerHTML += opcionDeMokepones
        botonHipodoge = document.getElementById("Hipodoge")
        botonCapipepo = document.getElementById("Capipepo")
        botonRatigueya = document.getElementById("Ratigueya")
    })
    botonMascota.addEventListener("click", seleccionMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    unirseAlJuego()

}
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function seleccionMascotaJugador () {
   
    sectionSeleccionarMascota.style.display = "none"
    
    if (botonHipodoge.checked) {
        spanMascotaJugador.innerHTML = botonHipodoge.id
        mascotaJugador = botonHipodoge.id
    } else if (botonCapipepo.checked) {
        spanMascotaJugador.innerHTML = botonCapipepo.id
        mascotaJugador = botonCapipepo.id
    } else if (botonRatigueya.checked) {
        spanMascotaJugador.innerHTML = botonRatigueya.id
        mascotaJugador = botonRatigueya.id
    } else {
        alert("Debes seleccionar una mascota cerdo")
        location.reload()
    }
    selecionarMokepon(mascotaJugador)
    extraerMascota (mascotaJugador)
    sectionMapa.style.display = "flex"
    iniciarMapa()     
}
function selecionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
           "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
function teclaPresionada(e) {
    switch (e.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
    }
}
function iniciarMapa(){
    mascotaJugadorObjeto = objetoMascota(mascotaJugador)
    intervalo = setInterval(pintarPersonaje, 50)
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerMovimiento)
}
function extraerMascota(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataqueMascotaJugador = `<button id=${ataque.id} class="boton-ataque bAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataqueMascotaJugador
        
    })
        botonFuego = document.getElementById("boton-fuego")
        botonAgua = document.getElementById("boton-agua")
        botonTierra = document.getElementById("boton-tierra")
        botones = document.querySelectorAll('.bAtaque')    
}
function secuenciaAtaque () {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "fuego") {
                ataqueJugador.push("fuego")
                console.log(ataqueJugador)
                boton.style.background= "#B4B4B4"
                boton.disabled = true
            } else if (e.target.textContent === "agua") {
                ataqueJugador.push("agua")
                console.log(ataqueJugador)
                boton.style.background= "#B4B4B4"
                boton.disabled = true
            } else if (e.target.textContent === "tierra") {
                ataqueJugador.push("tierra")
                console.log(ataqueJugador)
                boton.style.background= "#B4B4B4"
                boton.disabled = true
            }
            ataqueAleatorio ()
            
        })
    })
   
}
function seleccionMascotaRival (enemigo) {
    /* let mascotaAleatoria = aleatorio (0, mokepones.length - 1) */

    spanMascotaRival.innerHTML = enemigo.nombre
    ataqueMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
} 
function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function ataqueAleatorio (){
    let rivalAleatorio = aleatorio (0, ataqueMokeponEnemigo.length - 1)
    if (ataqueMokeponEnemigo[rivalAleatorio].nombre === "fuego") {
        ataqueRival.push("fuego")
    } else if (ataqueMokeponEnemigo[rivalAleatorio].nombre === "agua") {
        ataqueRival.push("agua")
    } else if (ataqueMokeponEnemigo[rivalAleatorio].nombre === "tierra") {
        ataqueRival.push("tierra")
    }
    ataqueMokeponEnemigo.splice(rivalAleatorio, 1)
    console.log(ataqueRival)
    iniciarPelea ()
}
function iniciarPelea () {
    if (ataqueJugador.length === 5) {
        combate()
    }
}
function crearMensajes () {
    let nuevosAtaqueJugador = document.createElement("p")
    let nuevosAtaqueRival = document.createElement("p")

    sectionMensaje.innerHTML = batalla
    nuevosAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevosAtaqueRival.innerHTML = indexAtaqueRival

    AtaqueDelJugador.appendChild (nuevosAtaqueJugador)
    AtaqueDelRival.appendChild (nuevosAtaqueRival)
}
function indexAmbosOponentes (jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueRival = ataqueRival[enemigo]
}
function combate () {
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueRival[i]) {
            indexAmbosOponentes (i, i)
            batalla = "Empate 😐"
            crearMensajes ()
        } else if (ataqueJugador[i] === "agua" && ataqueRival[i] === "fuego") {
            indexAmbosOponentes (i, i)
            batalla = "Ganaste 💪🏽"
            victoriaJugador++
            spanVidasJugador.innerHTML = victoriaJugador
            crearMensajes ()
        } else if (ataqueJugador[i] === "fuego" && ataqueRival[i] === "tierra") {
            indexAmbosOponentes (i, i)
            batalla = "Ganaste 💪🏽"
            victoriaJugador++
            spanVidasJugador.innerHTML = victoriaJugador
            crearMensajes ()
        } else if (ataqueJugador[i] === "tierra" && ataqueRival[i] === "agua") {
            indexAmbosOponentes (i, i)
            batalla = "Ganaste 💪🏽"
            victoriaJugador++
            spanVidasJugador.innerHTML = victoriaJugador
            crearMensajes ()
        } else {
            indexAmbosOponentes (i, i)
            batalla = "perdiste 😕"
            victoriaRival++
            spanVidasRival.innerHTML = victoriaRival
            crearMensajes ()
        }   
    }
    revisarVictorias ()
    return batalla
}
function crearMensajeFinal (resultadoFinal) {
    
    sectionMensaje.innerHTML = resultadoFinal   
    sectionReiniciar.style.display = "block"
}
function revisarVictorias () {
    if (victoriaJugador === victoriaRival) {
        crearMensajeFinal ("EMPATE POR MANCO")
    } else if (victoriaJugador < victoriaRival) {
        crearMensajeFinal ("Perdiste por manco, CERDOOOO")
    } else if (victoriaJugador > victoriaRival) {
        crearMensajeFinal ("FELICITACIONES, Ganastes el juego 💪🏽")
    }
}
function reiniciarJuego () {
    location.reload ()
}
function pintarPersonaje () {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    ctx.clearRect (0, 0, canvas.width, canvas.height)
    ctx.drawImage(
        mapaBackground,
        0,
        0,
        canvas.width,
        canvas.height
    )
    mascotaJugadorObjeto.aparecerMokepones()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    console.log(mascotaJugadorObjeto.x);
  /*   mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.aparecerMokepones()
    }) */
    hipodogeEnemigo.aparecerMokepones()
    capipepoEnemigo.aparecerMokepones()
    ratigueyaEnemigo.aparecerMokepones()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }

}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/:${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    /* .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ( { enemigos }) {
                    enemigos.forEach((function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
                        } else {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                    }))
                })
        }

    }) */
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}
function detenerMovimiento () {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function objetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}
function revisarColision (enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const IzquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota= mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const IzquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < IzquierdaEnemigo ||
        IzquierdaMascota > derechaEnemigo 
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "Flex"
    sectionMapa.style.display ="none"
    seleccionMascotaRival(enemigo) 
    
}
anchoMapa = window.innerWidth - 20

alturaOptima = anchoMapa * 600 / 800
canvas.width = anchoMapa
canvas.height = alturaOptima
if (anchoMapa > anchoMaximo) {
anchoMapa = anchoMaximo - 20
}