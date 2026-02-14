// const API_URL = 'http://localhost:3000/tasks';
const API_URL = 'http://127.0.0.1:3000/tasks';

// Professional Trace Logger
const logger = (step, message, data = "") => {
    console.log(`%c[Step ${step}] %c${message}`, "color: #6366f1; font-weight: bold", "color: #cbd5e1", data);
};

// Centralized API Request Handler
async function apiRequest(url, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);
        logger(3, `Response Status: ${response.status}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status !== 204 ? await response.json() : { success: true };
    } catch (error) {
        console.error("🚨 API Error:", error.message);
        return null;
    }
}

// 1. Fetch Data from Registry
async function fetchTasks() {
    logger(2, "Fetching data from backend...");
    const tasks = await apiRequest(API_URL);

    if (tasks) {
        logger(4, "Data received successfully", tasks);
        renderTasks(tasks);
        updateStats(tasks);
    } else {
        logger("ERR", "Failed to receive data. Retrying in 5s...");
        setTimeout(fetchTasks, 5000);
    }
}

// 2. Update Dashboard Metrics
function updateStats(tasks) {
    const completedCount = tasks.filter(t => t.isCompleted).length;
    document.getElementById('total-count').innerText = tasks.length;
    document.getElementById('completed-count').innerText = completedCount;
    document.getElementById('pending-count').innerText = tasks.length - completedCount;
}

// 3. Dynamic UI Rendering
function renderTasks(tasks) {
    logger(5, "Rendering tasks to UI...");
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    if (tasks.length === 0) {
        list.innerHTML = `
            <div class="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600">
                <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-2 opacity-20"></i>
                <p>No active operations found in registry.</p>
            </div>`;
    } else {
        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = `cyber-glass p-5 rounded-2xl flex items-center justify-between transition-all hover:bg-indigo-500/5 ${task.isCompleted ? 'border-emerald-500/30' : 'border-indigo-500/20'}`;

            card.innerHTML = `
                <div class="flex gap-4 items-center">
                    <button onclick="toggleStatus(${task.id}, ${task.isCompleted})" 
                        class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-indigo-500/40 hover:border-indigo-400'}">
                        ${task.isCompleted ? '<i data-lucide="check" class="w-4 h-4 text-slate-900"></i>' : ''}
                    </button>
                    <div>
                        <h4 class="font-bold text-lg ${task.isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'}">${task.title}</h4>
                        <p class="text-slate-500 text-sm italic">${task.description || 'Secure encrypted record.'}</p>
                    </div>
                </div>
                <button onclick="deleteTask(${task.id})" class="text-slate-600 hover:text-red-400 p-2 transition-colors">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>`;
            list.appendChild(card);
        });
    }
    lucide.createIcons();
    logger(6, "UI Synchronization Complete.");
}

// 4. Operational Actions
async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    if (!title) return alert("Operation Title required");

    const result = await apiRequest(API_URL, 'POST', { title, description });
    if (result) {
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        await fetchTasks();
    }
}

async function toggleStatus(id, current) {
    await apiRequest(`${API_URL}/${id}/status`, 'PATCH', { isCompleted: !current });
    await fetchTasks();
}

async function deleteTask(id) {
    if (confirm("Permanently wipe this record?")) {
        await apiRequest(`${API_URL}/${id}`, 'DELETE');
        await fetchTasks();
    }
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
    logger(1, "DOM fully loaded. Booting system...");
    fetchTasks();
});