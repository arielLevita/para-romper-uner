const listaReservas = document.getElementById("listaReservas");
const buscarReservas = document.getElementById("buscarReserva");
let data;

async function loadPage() {

    if (localStorage.getItem("data")) {
        data = await getDataFromLS();
    } else {
        data = await getDataFromJSON();
    }

    console.log(data.reservas)
}

loadPage()

async function getDataFromLS() {
    try {
        const data = localStorage.getItem("data");
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
    }
}

async function getDataFromJSON() {
    try {
        const response = await fetch("../mock_data/mockData.json");
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(error);
    }
}

buscarReservas.addEventListener('submit', e => {
    e.preventDefault();

    const documento = parseInt(documentoPaciente.value.trim());

    const { obrasSociales, medicos, turnos, especialidades } = data;
    const reservasFiltradas = data.reservas.filter(reserva => reserva.documento === documento);

    console.log(reservasFiltradas);

    listaReservas.innerHTML = "";

    if (data.medicos.length == 0) {
        listaReservas.innerHTML = 'No hay médicos';
        return;
    }

    let dFrag = document.createDocumentFragment();
    reservasFiltradas.forEach(reserva => {
        let div = document.createElement("div");
        let turno = turnos.filter(turno => reserva.idTurno === turno.idTurno)[0];
        let medico = medicos.filter(medico => turno.idMedico === medico.idMedico)[0];
        let especialidad = especialidades.filter(especialidad => reserva.idEspecialidad === especialidad.idEspecialidad)[0];
        let obraSocial = obrasSociales.filter(obraSocial => reserva.idObraSocial === obraSocial.idObraSocial)[0] || null;
        
        /* let valor = 0

        if (reserva.idObraSocial && medico.obrasSocialesQueAcepta.includes(obraSocial.idObraSocial)) {
            valor = parseInt(medico.valorConsulta * obraSocial.descuento / 100);
        } */
        
        div.innerHTML = `
            <div class="card shadow" style="width: 18rem;">
                <img src="${medico.imagenMedico}" class="card-img-top" alt="Imagen de ${medico.apellidoMedico}">
                <div class="card-body">
                    <h5 class="card-title">${medico.titulo} ${medico.nombreMedico} ${medico.apellidoMedico}</h5>
                    <p class="card-text">${especialidad.nombreEspecialidad}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Obra Social: ${obraSocial ? obraSocial.nombreObraSocial : "Sin obra Social"}</li>
                    <li class="list-group-item">Día: ${turno.dia}</li>
                    <li class="list-group-item">Horario: ${turno.hora}</li>
                    </ul>
                    <div class="card-body">
                    <li class="list-group-item">Valor de la consulta($): ${reserva.valorConsulta}</li>
                </div>
            </div>
        `;
        dFrag.appendChild(div);
    })
    listaReservas.appendChild(dFrag);
});
