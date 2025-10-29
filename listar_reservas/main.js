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

    const medicos = data.medicos;
    const turnos = data.turnos;
    const especialidades = data.especialidades;
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
        div.innerHTML = `
            <p>Turno con: ${medico.titulo} ${medico.nombreMedico} ${medico.apellidoMedico}.</p>
            <p>${especialidad.nombreEspecialidad}
            <img src="${medico.imagenMedico}" style="width: 100px;" />
        `;
        dFrag.appendChild(div);
    })
    listaReservas.appendChild(dFrag);
});

/* buscarReservas.addEventListener('submit', e => {
    e.preventDefault();

    const documento = parseInt(documentoPaciente.value.trim());

    const { medicos, turnos, especialidades, reservas } = data;

    const reservasFiltradas = reservas.filter(reserva => reserva.documento === documento);

    console.log(`Reservas encontradas para ${documento}:`);
    console.table(reservasFiltradas);

    listaReservas.innerHTML = "";

    if (reservasFiltradas.length === 0) {
        listaReservas.innerHTML = '<div class="alert alert-info">No se encontraron reservas para este documento.</div>';
        return;
    }

    let dFrag = document.createDocumentFragment();

    reservasFiltradas.forEach(reserva => {

        const turnoEncontrado = turnos.filter(t => t.idTurno === reserva.idTurno)[0];

        if (!turnoEncontrado) {
            console.error(`Turno con id ${reserva.idTurno} no encontrado.`);
            return;
        }

        const medico = medicos.filter(m => m.idMedico === turnoEncontrado.idMedico)[0];
        const especialidad = especialidades.filter(e => e.idEspecialidad === reserva.idEspecialidad)[0];

        if (!medico || !especialidad) {
            console.error(`Datos incompletos para la reserva ID: ${reserva.idReserva}.`);
            return;
        }

        let div = document.createElement("div");
        div.classList.add("col-md-6");
        div.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${especialidad.nombreEspecialidad}</h5>
                    <p class="card-text">
                        <strong>Fecha/Hora:</strong> ${turnoEncontrado.día.charAt(0).toUpperCase() + turnoEncontrado.día.slice(1)} a las ${turnoEncontrado.hora}
                    </p>
                    <hr>
                    <p class="card-text">
                        <strong>Médico:</strong> ${medico.titulo} ${medico.nombreMedico} ${medico.apellidoMedico}
                    </p>
                    <p class="card-text">
                        <strong>Matrícula:</strong> ${medico.matricula}
                    </p>
                    <p class="card-text">
                        <strong>Costo de la Consulta:</strong> $${reserva.valorConsulta.toLocaleString('es-AR')}
                    </p>
                    <p class="card-text">
                        <small class="text-muted">${medico.descripcionMedico}</small>
                    </p>
                    ${medico.imagenMedico ? `<img src="${medico.imagenMedico}" class="img-fluid rounded-start mt-2" alt="Imagen del Médico" style="max-width: 100px; height: auto;">` : ''}
                </div>
            </div>
        `;
        dFrag.appendChild(div);
    })
    listaReservas.appendChild(dFrag);
}); */