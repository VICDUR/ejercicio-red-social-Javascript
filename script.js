// Definición de la URL base de la API
const urlBase = 'http://localhost:3000/api/posts';

// Array para almacenar los posts
let posts = []; 

// Función para obtener datos de la API
const getData = () => {
    fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            posts = data;
            renderList();
        })
        .catch(error => console.error('Error al llamar la API', error));
};

// Función para renderizar la lista de posts en el HTML
const renderList = () => {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('postItem');

        listItem.innerHTML = `
      <strong>${post.title}</strong>
      <p>${post.body}</p>
      <button onclick="editPost(${post.id})">Editar</button>
      <button onclick="borrarPost(${post.id})">Borrar</button>

      <div id='editForm-${post.id}' class='editForm' style="display:none">
          <label for='editTitle'>Título: </label>
          <input type='text' id='editTitle-${post.id}' value='${post.title}' required>
          <label for='editBody'>Comentario: </label>
          <textarea id='editBody-${post.id}' required>${post.body}</textarea>
          <button onclick="updatePost(${post.id})"> Actualizar </button>
      </div>
    `;

        postList.append(listItem);
    });
};

// Función para agregar un nuevo post
const posData = (event) => {
    event.preventDefault();
    const posTitleInput = document.getElementById('posTitle');
    const postBodyInput = document.getElementById('postBody');
    const posTitle = posTitleInput.value;
    const postBody = postBodyInput.value;

    if (posTitle.trim() === '' || postBody.trim() === '') {
        alert('Campos obligatorios');
        return;
    }

    const object = {
        title: posTitle,
        body: postBody,
        userId: 1,
    };

    fetch(urlBase, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(resp => resp.json())
        .then(data => {
            posts.unshift(data);
            renderList();
            posTitleInput.value = '';
            postBodyInput.value = '';
        })
        .catch(error => console.error('Error al querer crear posteo', error));
};

// Función para mostrar/ocultar formulario de edición de un post
const editPost = (id) => {
    const editForm = document.getElementById(`editForm-${id}`);
    editForm.style.display = (editForm.style.display === 'none') ? 'block' : 'none';
};

// Función para actualizar un post existente
const updatePost = (id) => {
    const editTitle = document.getElementById(`editTitle-${id}`).value;
    const editBody = document.getElementById(`editBody-${id}`).value;

    fetch(`${urlBase}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: editTitle,
            body: editBody,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(res => res.json())
        .then(data => {
            const index = posts.findIndex(post => post.id === data.id);
            if (index !== -1) {
                posts[index] = data;
                renderList();
            } else {
                alert('Hubo un error al actualizar la información del posteo');
            }
        })
        .catch(error => console.error('Error al actualizar el posteo', error));
};

// Función para borrar un post
const borrarPost = (id) => {
    fetch(`${urlBase}/${id}`, {
        method: 'DELETE',
    })
        .then(resp => {
            if (resp.ok) {
                posts = posts.filter(element => element.id !== id);
                renderList();
            } else {
                alert('Hubo un error y no se pudo eliminar el posteo');
            }
        })
        .catch(error => console.error('Error al eliminar el posteo', error));
};

// Función para inicializar la carga de datos al cargar la página

getData();
