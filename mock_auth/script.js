// =================== LOGIN ===================
const USERS = [{
    username: "admin",
    password: "ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270"
    // La contraseña es "admin1234".
}]

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    // console.log(Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join(""))
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const passHash = await hashPassword(password);
    const user = USERS.find(u => u.username === username && u.password === passHash);

    if (user) {
        alert("Login correcto");
        localStorage.setItem("auth", JSON.stringify({ username, isAdmin: true }));
        window.location.href = "admin.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

if (document.getElementById("loginForm")) {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleLogin);
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

