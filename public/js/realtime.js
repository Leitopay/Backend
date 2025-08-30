const socket = io();

// Actualizar lista de productos en pantalla
socket.on("updateProducts", (products) => {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.title} - ${p.price}`;
    list.appendChild(li);
  });
});

// Formulario agregar producto
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  socket.emit("newProduct", { title, price });
});

// Formulario eliminar producto
document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("productId").value;
  socket.emit("deleteProduct", id);
});
