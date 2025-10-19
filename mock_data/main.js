const contenedor = document.getElementById("contenedor");

async function loadPage() {
    let data;

    if (localStorage.getItem("data")) {
        data = await getDataFromLocalStorage();
    } else {
        data = await getDataFromJSON();
    }

    mostrarMedicos(data);
}

loadPage();

async function getDataFromJSON() {
    try {
        const response = await fetch("mockData.json");
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getDataFromLocalStorage() {
    try {
        const data = localStorage.getItem("data");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

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
                    // `<p>Hoy vino a trabajar ${medico.titulo} ${medico.nombreMedico} ${medico.apellidoMedico}.</p>
                `<img src="${medico.imagenMedico}" style="width: 100px;" />`;
                div.appendChild(divMed);
            });
        }
        dFrag.appendChild(div);
    })
    contenedor.appendChild(dFrag);
}