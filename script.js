async function agregarItem() {
    const nombre = document.getElementById('nombre').value;
    const valor = document.getElementById('valor').value;

    // Evita agregar si los campos están vacíos
    if (!nombre || !valor) {
        alert("Por favor, completa ambos campos.");
        return;
    }

    const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, valor: Number(valor) })
    });

    if (response.ok) {
        cargarItems(); // Llama a cargarItems solo si la respuesta es correcta
    }
}

async function cargarItems() {
    const response = await fetch('http://localhost:3000/api/items');
    const items = await response.json();
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ''; // Limpia la lista antes de agregar nuevos items
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre}: ${item.valor}`;
        itemsList.appendChild(li);
    });
}

async function borrarTodo() {
    try {
        const response = await fetch('http://localhost:3000/api/items', {
            method: 'DELETE',
        });

        if (response.ok) {
            cargarItems(); // Actualiza la lista después de borrar
        } else {
            console.error('Error al borrar los items:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

// Cargar items al inicio
cargarItems();