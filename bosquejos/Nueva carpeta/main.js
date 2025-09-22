/* const USERS = [
    {
        id: 1,
        name: "Ariel Levita",
        role: "Estudiante",
        github: "arielLevita",
        email: "levita.ariel@gmail.com",
        image: "./assets/ariel.jpg"
    },
    {
        id: 2,
        name: "Elisa Beltramone",
        role: "Estudiante",
        github: "",
        email: "elisabeltramone@hotmail.com"
    },
    {
        id: 3,
        name: "Gabriel Osvaldo Roman",
        role: "Estudiante",
        github: "GabrielORoman",
        email: "gabrielroman100@gmail.com"
    },
    {
        id: 4,
        name: "Maria Alejandra Olivares Contreras",
        role: "Estudiante",
        github: "",
        email: "mariaolivares0119@gmail.com"
    },
    {
        id: 5,
        name: "Nerina Bonnin",
        role: "Estudiante",
        github: "NerinaBonnin",
        email: "nerinabonnin07@gmail.com",
        image: "./assets/nerina.jpg"
    },
    {
        id: 6,
        name: "Walter Osvaldo Cuesta",
        role: "Estudiante",
        github: "wox9000",
        email: "waltercuesta83@gmail.com",
        image: "./assets/walter.jpg"
    },
]

function cardGenerator() {
    let docFrag = document.createDocumentFragment();
    USERS.forEach(user => {
        let div = document.createElement("div");
        div.classList.add('user-card');
        div.innerHTML = `
                <img src="${user.image ? user.image : './assets/default-avatar.png'}" alt="Imagen de ${user.name}" />
                <div>
                    <h4>${user.name}</h4>
                    <div>
                        <p><a href="mailto:${user.email}">${user.email}</a></p>
                        <p><em>${user.role}</em></p>
                    </div>
                </div>
            `;
        docFrag.appendChild(div);
    });

    document.getElementById("cards-container").appendChild(docFrag);
} */



async function traerData() {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('Error al traer el JSON');
    }
    return await response.json();
}

async function cardGenerator() {
    try {
        const data = await traerData();
        console.log(data)
        let docFrag = document.createDocumentFragment();

        data.forEach(user => {
            let div = document.createElement("div");
            div.classList.add('user-card');
            div.innerHTML = `
                <img src="${user.image ? user.image : './assets/default-avatar.png'}" alt="Imagen de ${user.name}" />
                <div>
                    <h4>${user.name}</h4>
                    <div>
                        <p><a href="mailto:${user.email}">${user.email}</a></p>
                        <p><em>${user.role}</em></p>
                    </div>
                </div>
            `;
            docFrag.appendChild(div);
        });

        document.getElementById("cards-container").appendChild(docFrag);
    } catch (error) {
        console.error(error);
    }
}


cardGenerator();
