const contenedor = document.getElementById("contenedor");

async function getData() {
    try {
        const response = await fetch("mockData.json");
        const data = await response.json();
        mostrarMedicos(data)
        console.log(data.medicos);
    }
    catch (error) {
        console.log(error)
    }
}

getData()

function mostrarMedicos(data) {
    contenedor.innerHTML = "";

    if (data.medicos.length == 0) {
        contenedor.innerHTML = 'No hay médicos';
        return;
    }

    let dFrag = document.createDocumentFragment();
    data.especialidades.forEach(esp => {
        let div = document.createElement("div");
        div.innerHTML = `<h3>${esp.nombreEspecialidad}</h3>`

        let medicosEspecialidad = data.medicos.filter(
            medico => medico.idEspecialidad === esp.idEspecialidad
        );

        if (medicosEspecialidad.length == 0) {
            const p = document.createElement("p");
            p.textContent = "No hay médicos disponibles en esta especialidad.";
            div.appendChild(p);
        } else {
            medicosEspecialidad.forEach(medico => {
                const divMed = document.createElement("div");
                divMed.innerHTML =
                `<p>Hoy vino a trabajar ${medico.titulo} ${medico.nombreMedico} ${medico.apellidoMedico}.</p>
                <img src="${medico.imagenMedico}" style="width: 100px;" />`;
                div.appendChild(divMed);
            });
        }
        dFrag.appendChild(div);
    })
    contenedor.appendChild(dFrag);
}