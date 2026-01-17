const BASE_URL = "https://product-catalog-management.onrender.com/products";


// Toast
function showToast(msg, type="success") {
    const toastEl = document.getElementById("appToast");
    const toastMsg = document.getElementById("toastMessage");

    toastMsg.innerText = msg;

    if (type === "success") toastEl.className = "toast align-items-center text-white bg-success border-0";
    if (type === "error") toastEl.className = "toast align-items-center text-white bg-danger border-0";
    if (type === "warning") toastEl.className = "toast align-items-center text-dark bg-warning border-0";

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

let currentPage = 1;
let totalPages = 1;

// PAGINATION LOAD
async function loadPaginated(page = 1) {
    document.getElementById("loader").style.display = "block";

    const res = await fetch(`${BASE_URL}/paginate?page=${page}&limit=3`);
    const data = await res.json();

    document.getElementById("loader").style.display = "none";

    currentPage = data.currentPage;
    totalPages = data.totalPages;

    displayProducts(data.products);
    renderPagination();
}

function renderPagination() {
    const controls = document.getElementById("paginationControls");
    controls.innerHTML = "";

    let html = "";

    html += `<button class="btn btn-outline-primary btn-sm me-1" onclick="goPrev()" ${currentPage===1 ? "disabled" : ""}>Prev</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="btn btn-outline-dark btn-sm me-1" onclick="loadPaginated(${i})" ${i===currentPage ? "disabled" : ""}>${i}</button>`;
    }

    html += `<button class="btn btn-outline-primary btn-sm" onclick="goNext()" ${currentPage===totalPages ? "disabled" : ""}>Next</button>`;

    controls.innerHTML = html;
}

function goPrev() {
    if (currentPage > 1) loadPaginated(currentPage - 1);
}

function goNext() {
    if (currentPage < totalPages) loadPaginated(currentPage + 1);
}

// DISPLAY TABLE
function displayProducts(products) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">No products found</td>
            </tr>
        `;
        return;
    }

    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${formatPrice(p.price)}</td>
                <td>${p.description || ""}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-1" onclick="openEdit('${p._id}', '${p.name}', '${p.category}', ${p.price}, '${p.description || ""}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

function formatPrice(p) {
    return "₹ " + Number(p).toLocaleString("en-IN");
}

// ADD PRODUCT
async function addProduct() {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    if (!name || !category || !price) {
        showToast("Please fill all required fields!", "error");
        return;
    }

    await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, price, description })
    });

    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";

    loadPaginated();
    showToast("Product Added!");
}

// DELETE (Modal)
function deleteProduct(id) {
    const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
    document.getElementById("confirmDeleteBtn").onclick = async () => {
        await fetch(`${BASE_URL}/delete/${id}`, { method: "DELETE" });
        modal.hide();
        loadPaginated(currentPage);
        showToast("Product Deleted!", "warning");
    };
    modal.show();
}

// SEARCH
async function searchProduct() {
    const text = document.getElementById("searchBox").value;
    if (!text) return loadPaginated();
    const res = await fetch(`${BASE_URL}/search?name=${text}`);
    const data = await res.json();
    displayProducts(data);
}

// CATEGORY FILTER
async function filterCategory() {
    const c = document.getElementById("categoryFilter").value;
    document.getElementById("searchBox").value = "";
    
    if (c === "") return loadPaginated();

    const res = await fetch(`${BASE_URL}/search?category=${c}`);
    const data = await res.json();
    displayProducts(data);
}

// CATEGORY LOAD (Dynamic)
async function loadCategories() {
    const res = await fetch(`${BASE_URL}/categories`);
    const cats = await res.json();

    const select = document.getElementById("categoryFilter");
    select.innerHTML = `<option value="">All Categories</option>`;
    cats.forEach(c => select.innerHTML += `<option value="${c}">${c}</option>`);
}

// SORT
async function sortAsc() {
    const res = await fetch(`${BASE_URL}/all`);
    const data = await res.json();
    data.sort((a, b) => a.price - b.price);
    displayProducts(data);
}

async function sortDesc() {
    const res = await fetch(`${BASE_URL}/sort?order=desc`);
    const data = await res.json();
    displayProducts(data);
}

let editId = null;

// EDIT MODAL
function openEdit(id, name, category, price, description) {
    editId = id;
    document.getElementById("editName").value = name;
    document.getElementById("editCategory").value = category;
    document.getElementById("editPrice").value = price;
    document.getElementById("editDescription").value = description;

    document.getElementById("editModal").style.display = "block";
}

function closeEdit() {
    document.getElementById("editModal").style.display = "none";
}

// UPDATE
async function updateProduct() {
    const updatedProduct = {
        name: document.getElementById("editName").value,
        category: document.getElementById("editCategory").value,
        price: Number(document.getElementById("editPrice").value),
        description: document.getElementById("editDescription").value
    };

    if (!updatedProduct.name || !updatedProduct.category || !updatedProduct.price) {
        showToast("Invalid update!", "error");
        return;
    }

    await fetch(`${BASE_URL}/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
    });

    closeEdit();
    loadPaginated(currentPage);
    showToast("Product Updated!");
}

// FIRST LOAD
loadPaginated();
loadCategories();
