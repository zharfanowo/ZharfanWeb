function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab:nth-child(${['inicio', 'basicos', 'avanzados', 'comentarios'].indexOf(sectionId) + 1})`).classList.add('active');
    
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

function agregarComentario() {
    const nombre = document.getElementById('nombreComentario').value;
    const comentario = document.getElementById('textoComentario').value;
    
    if (nombre && comentario) {
        const nuevoComentario = document.createElement('div');
        nuevoComentario.innerHTML = `<strong>${nombre}:</strong> ${comentario}`;
        document.getElementById('comentariosLista').appendChild(nuevoComentario);
        
        const comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
        comentarios.push({nombre, comentario});
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        
        document.getElementById('nombreComentario').value = '';
        document.getElementById('textoComentario').value = '';
    }
    return false;
}

function cargarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
    const listaComentarios = document.getElementById('comentariosLista');
    comentarios.forEach(c => {
        const comentarioElement = document.createElement('div');
        comentarioElement.innerHTML = `<strong>${c.nombre}:</strong> ${c.comentario}`;
        listaComentarios.appendChild(comentarioElement);
    });
}

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

window.onload = function() {
    cargarComentarios();
    if (window.innerWidth <= 768) {
        document.getElementById('mobileMenu').classList.remove('active');
    }
};

window.onresize = function() {
    if (window.innerWidth > 768) {
        document.getElementById('mobileMenu').classList.add('active');
    } else {
        document.getElementById('mobileMenu').classList.remove('active');
    }
};
