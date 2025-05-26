// Botão de logout
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    window.location.href = "/../../login.html";
});

// Carrega as anotações ao abrir
document.addEventListener('DOMContentLoaded', loadNotes);

// Função que busca resposta da IA
async function enviarPergunta(textoAnotacao) {
    try {
        const response = await fetch("http://localhost:3000/api/pergunta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pergunta: textoAnotacao })
        });

        const data = await response.json();
        return data.resposta || "Sem resposta da IA.";
    } catch (error) {
        console.error("Erro ao buscar resposta da IA:", error);
        return "Erro ao buscar resposta da IA.";
    }
}

// Evento do botão “Analisar com IA”
document.getElementById('analyze-btn').addEventListener('click', async function () {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();

    if (!content) {
        alert('Por favor, escreva algo para analisar');
        return;
    }

    document.getElementById('loading-modal').classList.remove('hidden');

    const respostaIA = await enviarPergunta(content);

    saveNote(title, content, respostaIA);
    loadNotes();
    document.getElementById('loading-modal').classList.add('hidden');

    // Exibe sugestões na tela
    document.getElementById('suggestions-content').innerText = respostaIA;
    document.getElementById('suggestions-container').classList.remove('hidden');
});

// Evento do botão “Salvar”
document.getElementById('save-btn').addEventListener('click', function () {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();

    if (!content) {
        alert('Por favor, escreva algo para salvar');
        return;
    }

    saveNote(title, content);
    loadNotes();

    const saveBtn = document.getElementById('save-btn');
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    saveBtn.classList.add('save-success');

    setTimeout(() => {
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar';
        saveBtn.classList.remove('save-success');
    }, 2000);
});

// Função de salvar anotação
function saveNote(title, content, suggestions = null) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const existingIndex = notes.findIndex(note =>
        note.title === title && note.content === content);

    const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString('pt-BR'),
        suggestions
    };

    if (existingIndex !== -1) {
        notes[existingIndex] = newNote;
    } else {
        notes.unshift(newNote);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
}

// Renderiza as anotações salvas
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const notesList = document.getElementById('notes-list');
    const sidebarList = document.getElementById('sidebar-notes-list');

    notesList.innerHTML = notes.length > 0
        ? notes.map(n => `
        <div class="note-card">
            <div class="note-card-header">
                <h3>${n.title}</h3>
                <span>${n.date}</span>
            </div>
            <p>${n.content}</p>
            ${n.suggestions ? `<details><summary>IA</summary><div>${n.suggestions}</div></details>` : ''}
        </div>
    `).join('')
        : '<p>Nenhuma anotação ainda.</p>';

    sidebarList.innerHTML = notes.map(n => `
        <div class="sidebar-note" data-id="${n.id}">
            <h4>${n.title}</h4>
            <p>${n.date}</p>
        </div>
    `).join('');
}

// Eventos adicionais
document.getElementById('new-note-btn').addEventListener('click', () => {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
});

document.getElementById('view-notes-btn').addEventListener('click', () => {
    document.getElementById('notes-sidebar').classList.add('active');
    document.getElementById('sidebar-overlay').classList.add('active');
});

document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);
function closeSidebar() {
    document.getElementById('notes-sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
}

document.getElementById('close-suggestions').addEventListener('click', () => {
    document.getElementById('suggestions-container').classList.add('hidden');
});

document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.remove('hidden');
});
document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
});
