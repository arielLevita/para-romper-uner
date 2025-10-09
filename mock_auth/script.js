// =================== LOGIN ===================
const USERS = [
    { username: "admin", password: "1234" }
];

if (document.getElementById("loginForm")) {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = USERS.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("auth", JSON.stringify({ username, isAdmin: true }));
            window.location.href = "admin.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}

// =================== ADMIN PANEL ===================
if (document.getElementById("itemList")) {
    // Verificar login
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.isAdmin) {
        window.location.href = "index.html";
    }

    const itemList = document.getElementById("itemList");
    const addForm = document.getElementById("addForm");
    const newItemInput = document.getElementById("newItem");
    const logoutBtn = document.getElementById("logoutBtn");

    // Cargar elementos desde localStorage
    let items = JSON.parse(localStorage.getItem("items")) || [];

    function renderItems() {
        itemList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item;
            const delBtn = document.createElement("button");
            delBtn.textContent = "Eliminar";
            delBtn.style.marginLeft = "10px";
            delBtn.onclick = () => {
                items.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(items));
                renderItems();
            };
            li.appendChild(delBtn);
            itemList.appendChild(li);
        });
    }

    renderItems();

    addForm.addEventListener("submit", e => {
        e.preventDefault();
        const newItem = newItemInput.value.trim();
        if (newItem) {
            items.push(newItem);
            localStorage.setItem("items", JSON.stringify(items));
            renderItems();
            newItemInput.value = "";
        }
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("auth");
        window.location.href = "index.html";
    });
}
