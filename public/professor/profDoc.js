// Dados simulados de alunos e anotações
const students = [
    { id: 1, name: "Ana Silva", email: "ana@exemplo.com", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Bruno Costa", email: "bruno@exemplo.com", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Carlos Mendes", email: "carlos@exemplo.com", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    { id: 4, name: "Daniela Lima", email: "daniela@exemplo.com", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
];

// Usuários simulados (para login)
const users = [
    { id: 1, email: "professor@exemplo.com", password: "senha123", name: "Professor", role: "teacher" }
];

// Anotações simuladas
let notes = [
    {
        id: 1,
        studentId: 1,
        title: "Procedimento com Paciente X",
        content: "Realizado atendimento inicial com paciente que apresentava dores abdominais. Paciente relatou histórico de gastrite. Foram verificados os sinais vitais e prescrito medicamento para alívio dos sintomas.",
        date: "15/05/2023",
        suggestions: "<h3 class='suggestion-title'>Sugestões para melhoria:</h3><ul class='suggestion-list'><li>Documentar os sinais vitais completos (PA, FC, FR, SatO2, temperatura)</li><li>Incluir detalhes sobre o exame físico abdominal</li><li>Especificar o medicamento prescrito e posologia</li></ul>",
        teacherFeedback: "Bom relato inicial, mas poderia incluir mais detalhes sobre o exame físico. 7/10"
    },
    {
        id: 2,
        studentId: 1,
        title: "Atendimento de emergência",
        content: "Paciente chegou com queimaduras de 2º grau nas mãos. Realizada limpeza e curativo com sulfadiazina de prata a 1%. Orientado sobre cuidados e marcado retorno em 3 dias.",
        date: "10/05/2023",
        suggestions: "<h3 class='suggestion-title'>Sugestões para melhoria:</h3><ul class='suggestion-list'><li>Documentar a extensão da área queimada (regra dos 9 ou da palma da mão)</li><li>Registrar o mecanismo de lesão (líquido quente, fogo, etc.)</li><li>Incluir avaliação de dor e medicação administrada</li></ul>",
        teacherFeedback: "Relato completo, com boa descrição do procedimento. 9/10"
    },
    {
        id: 3,
        studentId: 2,
        title: "Consulta de rotina",
        content: "Paciente diabético em acompanhamento. Verificada glicemia capilar: 145 mg/dL. Revisão dos pés sem lesões. Orientação sobre dieta e atividade física.",
        date: "12/05/2023",
        suggestions: "<h3 class='suggestion-title'>Sugestões para melhoria:</h3><ul class='suggestion-list'><li>Incluir valores anteriores para comparação</li><li>Documentar exame dos pés com mais detalhes (pulsos, sensibilidade)</li><li>Registrar se houve ajuste na medicação</li></ul>"
    },
    {
        id: 4,
        studentId: 3,
        title: "Atendimento pediátrico",
        content: "Criança de 5 anos com febre há 2 dias. Ausculta pulmonar sem ruídos. Otoscopia com membrana timpânica hiperemiada. Diagnóstico: otite média aguda. Prescrito amoxicilina.",
        date: "08/05/2023",
        suggestions: "<h3 class='suggestion-title'>Sugestões para melhoria:</h3><ul class='suggestion-list'><li>Documentar temperatura medida</li><li>Registrar estado geral da criança</li><li>Incluir dose e posologia do antibiótico prescrito</li><li>Orientar sobre sinais de alerta para retorno</li></ul>"
    }
];

// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar tela de login por padrão
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    
    // Se já estiver logado, mostrar a aplicação
    if (localStorage.getItem('loggedIn') === 'true') {
        loginSuccess();
    }
    
    // Carrega o tema salvo no localStorage ou usa o tema claro por padrão
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

// Sistema de Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Verifica as credenciais
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login bem-sucedido
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        loginSuccess();
    } else {
        alert('E-mail ou senha incorretos. Use: professor@exemplo.com / senha123');
    }
});

function loginSuccess() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    loadStudents();
}

// Botão de logout
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    window.location.href = "/../../login.html";
});

/**
 * Define o tema da aplicação (claro/escuro)
 * @param {string} theme - 'light' ou 'dark'
 */
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
    }
}

/**
 * Alterna entre temas claro e escuro
 */
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Evento do botão de alternar tema
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Carrega a lista de alunos
function loadStudents(searchTerm = '') {
    const studentsList = document.getElementById('students-list');
    let filteredStudents = [...students];
    
    // Aplica filtro de busca
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredStudents = filteredStudents.filter(s => 
            s.name.toLowerCase().includes(term) || 
            s.email.toLowerCase().includes(term)
        );
    }
    
    studentsList.innerHTML = filteredStudents.length > 0 
        ? filteredStudents.map(student => `
            <div class="student-card" data-id="${student.id}">
                <div class="student-info">
                    <img src="${student.avatar}" alt="${student.name}">
                    <div>
                        <h3>${student.name}</h3>
                        <p class="student-email">${student.email}</p>
                    </div>
                </div>
                <div class="student-footer">
                    <span class="notes-count">${getStudentNotesCount(student.id)} anotações</span>
                    <button class="view-notes-btn" data-id="${student.id}">
                        Ver anotações <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `).join('')
        : `<p class="no-students">Nenhum aluno encontrado</p>`;
    
    // Adiciona eventos aos cards de aluno
    document.querySelectorAll('.student-card, .view-notes-btn').forEach(element => {
        element.addEventListener('click', function() {
            const studentId = parseInt(this.dataset.id || this.closest('.student-card').dataset.id);
            openStudentNotes(studentId);
        });
    });
}

// Conta as anotações de um aluno
function getStudentNotesCount(studentId) {
    return notes.filter(note => note.studentId === studentId).length;
}

// Abre as anotações de um aluno na sidebar
function openStudentNotes(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    document.getElementById('sidebar-student-name').textContent = `Anotações de ${student.name}`;
    
    const studentNotes = notes.filter(note => note.studentId === studentId);
    const sidebarList = document.getElementById('sidebar-notes-list');
    
    sidebarList.innerHTML = studentNotes.length > 0 
        ? studentNotes.map(note => `
            <div class="sidebar-note" data-id="${note.id}">
                <h4>${note.title || 'Sem título'}</h4>
                <p>${note.date}</p>
            </div>
        `).join('')
        : `<p class="no-notes">Nenhuma anotação encontrada</p>`;
    
    // Adiciona eventos para abrir anotação no modal
    document.querySelectorAll('.sidebar-note').forEach(note => {
        note.addEventListener('click', function() {
            const noteId = parseInt(this.dataset.id);
            openNoteModal(noteId);
        });
    });
    
    // Abre a sidebar
    document.getElementById('notes-sidebar').classList.add('active');
    document.getElementById('sidebar-overlay').classList.add('active');
}

// Abre o modal com uma anotação completa
function openNoteModal(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    const student = students.find(s => s.id === note.studentId);
    
    document.getElementById('modal-note-title').textContent = note.title || 'Anotação sem título';
    document.getElementById('modal-note-date').textContent = note.date;
    document.getElementById('modal-note-author').textContent = `Por: ${student ? student.name : 'Aluno desconhecido'}`;
    document.getElementById('modal-note-content').textContent = note.content;
    
    if (note.suggestions) {
        document.getElementById('modal-suggestions-content').innerHTML = note.suggestions;
        document.getElementById('modal-note-suggestions').classList.remove('hidden');
    } else {
        document.getElementById('modal-note-suggestions').classList.add('hidden');
    }
    
    document.getElementById('teacher-feedback').value = note.teacherFeedback || '';
    
    // Armazena o ID da nota no modal para referência
    document.getElementById('note-modal').dataset.id = noteId;
    
    // Mostra o modal
    document.getElementById('note-modal').classList.remove('hidden');
}

// Fecha o modal de anotação
document.getElementById('close-note-modal').addEventListener('click', closeNoteModal);
document.getElementById('cancel-feedback').addEventListener('click', closeNoteModal);

function closeNoteModal() {
    document.getElementById('note-modal').classList.add('hidden');
}

// Salva o feedback do professor
document.getElementById('save-feedback').addEventListener('click', function() {
    const noteId = parseInt(document.getElementById('note-modal').dataset.id);
    if (!noteId) return;
    
    const feedback = document.getElementById('teacher-feedback').value.trim();
    
    // Atualiza a anotação com o feedback
    notes = notes.map(note => {
        if (note.id === noteId) {
            return { ...note, teacherFeedback: feedback };
        }
        return note;
    });
    
    alert('Feedback salvo com sucesso!');
    closeNoteModal();
});

// Fecha a sidebar
document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

function closeSidebar() {
    document.getElementById('notes-sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
}

// Busca de alunos
document.getElementById('search-input').addEventListener('input', function() {
    loadStudents(this.value.trim());
});