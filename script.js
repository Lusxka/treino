// Workout data
const workoutData = {
    monday: {
        name: "Segunda-feira",
        muscles: "Peito + Tríceps",
        icon: "💪",
        exercises: [
            { name: "Chest Press (máquina)", sets: "4 x 10", tip: "Foque na contração máxima do peitoral.", video: null },
            { name: "Crucifixo na máquina", sets: "4 x 12", tip: "Sua força aqui é ótima (79kg)! Use carga alta com controle total.", video: null },
            { name: "Crossover na polia alta", sets: "4 x 12", tip: "Alongue bem o peitoral na fase inicial do movimento.", video: null },
            { name: "Tríceps máquina (barra)", sets: "4 x 12", tip: "Mantenha a força (75kg) com execução perfeita.", video: null },
            { name: "Tríceps corda na polia", sets: "4 x 10", tip: "Abra bem a corda no final para esmagar o tríceps.", video: null },
            { name: "Tríceps francês na máquina", sets: "3 x 12", tip: "Foque no alongamento da cabeça longa do tríceps.", video: null }
        ]
    },
    tuesday: {
        name: "Terça-feira",
        muscles: "Costas + Bíceps",
        icon: "🦵",
        exercises: [
            { name: "Pulldown frontal (máquina)", sets: "4 x 10", tip: "Puxe a barra em direção ao peito, estufando-o.", video: null },
            { name: "Remada baixa (pegada neutra)", sets: "4 x 12", tip: "Mantenha as costas retas e puxe com os dorsais.", video: null },
            { name: "Puxada unilateral", sets: "4 x 10", tip: "Concentre-se em espremer um lado de cada vez.", video: null },
            { name: "Rosca direta máquina", sets: "4 x 12", tip: "Evite usar os ombros ou o corpo para levantar o peso.", video: null },
            { name: "Rosca alternada máquina Scott", sets: "4 x 10", tip: "Isole o bíceps, controlando a subida e a descida.", video: null },
            { name: "Face pull (polia alta)", sets: "3 x 15", tip: "Puxe a corda em direção ao rosto, focando nos ombros posteriores.", video: null }
        ]
    },
    wednesday: {
        name: "Quarta-feira",
        muscles: "Pernas Completo",
        icon: "🏋️",
        exercises: [
            { name: "Leg press 45º", sets: "4 x 12", tip: "Use carga alta com amplitude total e segura.", video: null },
            { name: "Cadeira Extensora", sets: "4 x 10-12", tip: "Na última série, faça um dropset (reduza o peso e continue até a falha).", video: null },
            { name: "Agachamento guiado (Smith)", sets: "4 x 10", tip: "Mantenha o abdômen contraído e a coluna neutra.", video: null },
            { name: "Mesa flexora", sets: "4 x 12", tip: "Concentre-se em 'espremer' o posterior de coxa no topo.", video: null },
            { name: "Cadeira flexora sentada", sets: "4 x 12", tip: "Ótimo para isolar e finalizar o posterior.", video: null },
            { name: "Panturrilha (leg press/máquina)", sets: "4 x 20", tip: "Alongue e contraia ao máximo em cada repetição.", video: null }
        ]
    },
    thursday: {
        name: "Quinta-feira",
        muscles: "Ombros + Abdômen",
        icon: "🔥",
        exercises: [
            { name: "Desenvolvimento frontal (máquina)", sets: "4 x 10", tip: "Não trave os cotovelos no topo do movimento.", video: null },
            { name: "Elevação lateral (máquina)", sets: "4 x 12", tip: "Lidere o movimento com os cotovelos, não com as mãos.", video: null },
            { name: "Elevação frontal (máquina/polia)", sets: "4 x 12", tip: "Movimento controlado, sem balançar o corpo.", video: null },
            { name: "Remada alta (máquina)", sets: "4 x 10", tip: "Puxe em direção ao queixo, focando em ombros e trapézio.", video: null },
            { name: "Abdômen crunch (máquina)", sets: "4 x 20", tip: "Concentre a força no abdômen.", video: null },
            { name: "Abdominal inferior (polia/banco)", sets: "3 x 20", tip: "Mantenha a lombar estável.", video: null },
            { name: "Prancha isométrica", sets: "3 x falha", tip: "Mantenha o corpo reto como uma prancha, sem elevar o quadril.", video: null }
        ]
    },
    friday: {
        name: "Sexta-feira",
        muscles: "Superiores Completo",
        icon: "⚡",
        exercises: [
            { name: "Chest press (máquina)", sets: "3 x 12", tip: "Foco em volume e contração.", video: null },
            { name: "Pulldown frontal (máquina)", sets: "3 x 12", tip: "Pegada aberta para focar na largura das costas.", video: null },
            { name: "Remada baixa (máquina)", sets: "3 x 12", tip: "Foco na espessura das costas.", video: null },
            { name: "Desenvolvimento ombro (máquina)", sets: "3 x 12", tip: "Mantenha a tensão nos ombros durante toda a série.", video: null },
            { name: "Tríceps máquina (barra/corda)", sets: "3 x 12", tip: "Escolha sua variação preferida.", video: null },
            { name: "Rosca bíceps (máquina)", sets: "3 x 12", tip: "Finalize com um bom 'pump' no bíceps.", video: null }
        ]
    }
};

// State management
let currentWeekData = {};
let currentTheme = 'dark';

// Initialize app
function initApp() {
    loadWeekData();
    renderDays();
    updateProgress();
    setupEventListeners();

    // Load theme
    const savedTheme = window.localStorage?.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Load week data from memory
function loadWeekData() {
    // Initialize if empty
    if (!currentWeekData || Object.keys(currentWeekData).length === 0) {
        currentWeekData = {};
        Object.keys(workoutData).forEach(day => {
            currentWeekData[day] = {
                completed: false,
                exercises: workoutData[day].exercises.map((_, index) => ({
                    completed: false,
                    index: index
                }))
            };
        });
    }
}

// Save week data to memory
function saveWeekData() {
    // Data is kept in memory during the session
    updateProgress();
}

// Render workout days
function renderDays() {
    const daysGrid = document.getElementById('daysGrid');
    daysGrid.innerHTML = '';
    Object.entries(workoutData).forEach(([dayKey, dayData]) => {
        const dayState = currentWeekData[dayKey];
        const completedExercises = dayState.exercises.filter(ex => ex.completed).length;
        const totalExercises = dayData.exercises.length;
        const isCompleted = dayState.completed;

        const dayCard = document.createElement('div');
        dayCard.className = `day-card ${isCompleted ? 'completed' : ''}`;
        dayCard.onclick = () => openExerciseModal(dayKey);
        dayCard.innerHTML = `
            <div class="day-header">
                <h3 class="day-name">${dayData.name}</h3>
                <div class="day-icon">${dayData.icon}</div>
            </div>
            <p class="day-muscles">${dayData.muscles}</p>
            <div class="day-stats">
                <div class="stat">
                    📋 ${completedExercises}/${totalExercises} exercícios
                </div>
                <div class="stat">
                    ⏱️ ${totalExercises * 3} min aprox.
                </div>
            </div>
            <div class="completion-badge">✓</div>
        `;
        daysGrid.appendChild(dayCard);
    });
}

// Open exercise modal
function openExerciseModal(dayKey) {
    const dayData = workoutData[dayKey];
    const modal = document.getElementById('exerciseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const exerciseList = document.getElementById('exerciseList');

    modalTitle.textContent = dayData.name;
    modalSubtitle.textContent = dayData.muscles;

    // Clear and populate exercises
    exerciseList.innerHTML = '';
    dayData.exercises.forEach((exercise, index) => {
        const exerciseState = currentWeekData[dayKey].exercises[index];
        const exerciseItem = document.createElement('div');
        exerciseItem.className = `exercise-item ${exerciseState.completed ? 'completed' : ''}`;
        exerciseItem.id = `exercise-${dayKey}-${index}`;
        exerciseItem.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-name" onclick="toggleVideo('${dayKey}', ${index})">
                    <span>${exercise.name}</span>
                    <span class="play-icon">▶️</span>
                </div>
                <div class="exercise-actions">
                    <span class="exercise-sets">${exercise.sets}</span>
                </div>
            </div>
            <p class="exercise-tip">${exercise.tip}</p>
            <div class="video-container" id="video-${dayKey}-${index}">
                ${exercise.video ?
                    `<iframe class="video-player" src="${exercise.video}" frameborder="0" allowfullscreen></iframe>` :
                    `<div class="video-placeholder">
                        <div class="video-placeholder-icon">🎬</div>
                        <div class="video-placeholder-text">Vídeo em breve!</div>
                        <div class="video-placeholder-subtitle">Demonstração do exercício será adicionada</div>
                    </div>`
                }
                <div class="video-controls">
                    <div class="video-title">${exercise.name} - Demonstração</div>
                    <button class="close-video" onclick="closeVideo('${dayKey}', ${index})">Fechar</button>
                </div>
            </div>
            <button class="complete-btn ${exerciseState.completed ? 'completed' : ''}"
                     onclick="toggleExercise('${dayKey}', ${index})">
                ${exerciseState.completed ? '✓ Concluído' : 'Marcar como Concluído'}
            </button>
        `;
        exerciseList.appendChild(exerciseItem);
    });

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('exerciseModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Toggle video display
function toggleVideo(dayKey, exerciseIndex) {
    const videoContainer = document.getElementById(`video-${dayKey}-${exerciseIndex}`);
    const exerciseItem = document.getElementById(`exercise-${dayKey}-${exerciseIndex}`);

    if (videoContainer.classList.contains('show')) {
        closeVideo(dayKey, exerciseIndex);
    } else {
        // Close any other open videos first
        document.querySelectorAll('.video-container.show').forEach(container => {
            container.classList.remove('show');
        });
        document.querySelectorAll('.exercise-item.video-open').forEach(item => {
            item.classList.remove('video-open');
        });

        // Open this video
        videoContainer.classList.add('show');
        exerciseItem.classList.add('video-open');

        // Scroll to video if needed
        setTimeout(() => {
            videoContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 200);
    }
}

// Close video
function closeVideo(dayKey, exerciseIndex) {
    const videoContainer = document.getElementById(`video-${dayKey}-${exerciseIndex}`);
    const exerciseItem = document.getElementById(`exercise-${dayKey}-${exerciseIndex}`);

    videoContainer.classList.remove('show');
    exerciseItem.classList.remove('video-open');
}

// Toggle exercise completion
function toggleExercise(dayKey, exerciseIndex) {
    const exerciseState = currentWeekData[dayKey].exercises[exerciseIndex];
    exerciseState.completed = !exerciseState.completed;

    // Check if all exercises for the day are completed
    const allCompleted = currentWeekData[dayKey].exercises.every(ex => ex.completed);
    currentWeekData[dayKey].completed = allCompleted;

    // Update UI
    const exerciseItem = document.querySelector(`#exercise-${dayKey}-${exerciseIndex}`);
    const completeBtn = exerciseItem.querySelector('.complete-btn');

    if (exerciseState.completed) {
        exerciseItem.classList.add('completed');
        completeBtn.classList.add('completed');
        completeBtn.textContent = '✓ Concluído';
    } else {
        exerciseItem.classList.remove('completed');
        completeBtn.classList.remove('completed');
        completeBtn.textContent = 'Marcar como Concluído';
    }

    // Save and update
    saveWeekData();
    renderDays();

    // Show celebration if day completed
    if (allCompleted) {
        showCelebration();
    }
}

// Show celebration animation
function showCelebration() {
    // Create celebration effect
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        z-index: 10000;
        animation: celebrationPop 1s ease-out forwards;
        pointer-events: none;
    `;
    
    // Add celebration animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrationPop {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(celebration);

    setTimeout(() => {
        document.body.removeChild(celebration);
        document.head.removeChild(style);
    }, 1000);
}

// Update weekly progress
function updateProgress() {
    const completedDaysCount = Object.values(currentWeekData).filter(day => day.completed).length;
    const totalDays = Object.keys(workoutData).length;
    const percentage = Math.round((completedDaysCount / totalDays) * 100);

    // Update progress ring
    const progressCircle = document.getElementById('weekProgress');
    const progressRing = document.querySelector('.progress-ring');
    
    progressCircle.textContent = `${percentage}%`;
    const degrees = (percentage / 100) * 360;
    progressRing.querySelector('.progress-circle').style.background =
        `conic-gradient(var(--success) ${degrees}deg, var(--border) ${degrees}deg)`;

    // Update completed days counter
    document.getElementById('completedDays').textContent = completedDaysCount;

    // Update page title with progress
    document.title = `WebCash Gym | ${completedDaysCount}/${totalDays} dias (${percentage}%)`;

    // Update footer stats
    updateFooterStats();
}

// Update footer statistics
function updateFooterStats() {
    const totalCompletedExercises = Object.values(currentWeekData).reduce((total, day) => {
        return total + day.exercises.filter(ex => ex.completed).length;
    }, 0);
    const completedDays = Object.values(currentWeekData).filter(day => day.completed).length;
    document.getElementById('footerCompletedExercises').textContent = totalCompletedExercises;
    document.getElementById('footerTrainingDays').textContent = completedDays;
}

// Theme toggle
function setTheme(theme) {
    currentTheme = theme;
    const themeToggle = document.getElementById('themeToggle');

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }

    // Save theme preference
    if (window.localStorage) {
        window.localStorage.setItem('theme', theme);
    }
}

// Reset week progress
function resetWeek() {
    if (confirm('Tem certeza que deseja resetar o progresso da semana?')) {
        // Reset all data
        Object.keys(workoutData).forEach(day => {
            currentWeekData[day] = {
                completed: false,
                exercises: workoutData[day].exercises.map((_, index) => ({
                    completed: false,
                    index: index
                }))
            };
        });

        // Update UI
        renderDays();
        updateProgress();
        closeModal();
        
        // Show reset confirmation
        showNotification('Progresso resetado! Boa sorte na nova semana! 💪');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 32px;
        background: var(--success);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
    `;

    // Add slide animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
    
    // Close modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Reset week button
    document.getElementById('resetWeek').addEventListener('click', resetWeek);
    
    // Close modal when clicking outside
    document.getElementById('exerciseModal').addEventListener('click', (e) => {
        if (e.target.id === 'exerciseModal') {
            closeModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            resetWeek();
        }
    });

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add loading state management
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('loading');
    });
}

// Add some motivational messages
const motivationalMessages = [
    "Foco, força e fé! 💪",
    "Cada rep te deixa mais forte! 🔥",
    "Seu futuro eu agradece! ⚡",
    "Disciplina é liberdade! 🎯",
    "Transformação em progresso! 🚀"
];

function getRandomMotivation() {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

// Add workout tips
const workoutTips = [
    "💡 Hidrate-se bem durante o treino!",
    "💡 Mantenha a respiração controlada em cada exercício",
    "💡 Qualidade > Quantidade sempre!",
    "💡 Descanse 60-90s entre as séries",
    "💡 Foque na conexão mente-músculo"
];

function showRandomTip() {
    const tip = workoutTips[Math.floor(Math.random() * workoutTips.length)];
    showNotification(tip);
}

// Show tip every 5 minutes when modal is open
setInterval(() => {
    if (document.getElementById('exerciseModal').classList.contains('show')) {
        showRandomTip();
    }
}, 300000); // 5 minutes

// Add progress tracking
function trackProgress() {
    const completedDays = Object.values(currentWeekData).filter(day => day.completed).length;
    const totalDays = Object.keys(workoutData).length;

    if (completedDays === totalDays) {
        setTimeout(() => {
            showNotification(`🎉 PARABÉNS! Semana completa! ${getRandomMotivation()}`);
        }, 1000);
    }
}

// Enhanced initialization with welcome message
function enhancedInit() {
    initApp();

    // Show welcome message on first visit
    setTimeout(() => {
        showNotification("Bem-vindo ao WebCash Gym! 🔥");
    }, 1000);

    // Track progress after initialization
    trackProgress();
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhancedInit);
} else {
    enhancedInit();
}

// Make functions globally available for onclick handlers from HTML
window.toggleExercise = toggleExercise;
window.openExerciseModal = openExerciseModal;
window.closeModal = closeModal;
window.toggleVideo = toggleVideo;
window.closeVideo = closeVideo;