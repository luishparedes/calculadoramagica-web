let productos = [];

function calcularPrecioVenta() {
    const costo = parseFloat(document.getElementById('costo').value);
    const ganancia = parseFloat(document.getElementById('ganancia').value) / 100;
    const moneda = document.getElementById('moneda').value;

    if (isNaN(costo) || isNaN(ganancia) || ganancia >= 1) {
        document.getElementById('resultadoPrecioVenta').innerText = 'Por favor, introduce valores válidos';
        return;
    }

    const precioVenta = costo / (1 - ganancia);

    document.getElementById('resultadoPrecioVenta').innerText = `Precio sugerido al público: ${moneda} ${precioVenta.toFixed(2)}`;
}

function guardarProducto() {
    const producto = document.getElementById('producto').value;
    const descripcion = document.getElementById('descripcion').value;
    const precioVenta = document.getElementById('resultadoPrecioVenta').innerText;

    if (producto === '' || descripcion === '' || precioVenta === 'Precio sugerido al público: ') {
        alert('Por favor, completa todos los campos y calcula el precio de venta');
        return;
    }

    productos.push({ nombre: producto, descripcion: descripcion, precio: precioVenta });
    actualizarLista();
    reiniciarCalculadora();
}

function mostrarLista() {
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = productos.map((producto, index) => `
        <div class="product-item">
            <span>${producto.nombre} - ${producto.descripcion} - ${producto.precio}</span>
            <button onclick="eliminarProducto(${index})">Borrar</button>
            <button onclick="modificarProducto(${index})">Modificar</button>
        </div>
    `).join('');
}

function actualizarLista() {
    mostrarLista();
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarLista();
}

function modificarProducto(index) {
    const nuevoPrecio = prompt('Introduce el nuevo precio:', productos[index].precio);
    if (nuevoPrecio) {
        productos[index].precio = nuevoPrecio;
        actualizarLista();
    }
}

function reiniciarCalculadora() {
    document.getElementById('producto').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('ganancia').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('resultadoPrecioVenta').innerText = 'Precio sugerido al público: ';
}
