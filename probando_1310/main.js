const hola = {
    saludo: "Hola",
    nombre: "Neri"
}

function saludar() {
    localStorage.setItem("hola1234", JSON.stringify(hola));
    return
}

function traerDeLS() {
    let saludito;

    saludito = localStorage.getItem("hola1234");
    // saludito = localStorage.getItem("hola1234");
    return JSON.parse(saludito);
    
}

saludar()
traerDeLS()
