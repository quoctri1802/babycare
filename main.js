// --- Data & State ---
const VACCINE_LIST = [
    { id: 1, name: 'Lao (BCG)', time: 'Sơ sinh', done: false, date: '' },
    { id: 2, name: 'Viêm gan B (Mũi 1)', time: 'Sơ sinh', done: false, date: '' },
    { id: 3, name: '6 trong 1 (Mũi 1)', time: '2 tháng', done: false, date: '' },
    { id: 4, name: 'Rota (Lần 1)', time: '2 tháng', done: false, date: '' },
    { id: 5, name: 'Phế cầu (Mũi 1)', time: '2 tháng', done: false, date: '' },
    { id: 6, name: '6 trong 1 (Mũi 2)', time: '3 tháng', done: false, date: '' },
    { id: 7, name: 'Rota (Lần 2)', time: '3 tháng', done: false, date: '' },
    { id: 8, name: '6 trong 1 (Mũi 3)', time: '4 tháng', done: false, date: '' },
    { id: 9, name: 'Phế cầu (Mũi 2)', time: '4 tháng', done: false, date: '' },
    { id: 10, name: 'Cúm (Mũi 1)', time: '6 tháng', done: false, date: '' },
    { id: 11, name: 'Não mô cầu BC (Mũi 1)', time: '6 tháng', done: false, date: '' },
    { id: 12, name: 'Cúm (Mũi 2)', time: '7 tháng', done: false, date: '' },
    { id: 13, name: 'Não mô cầu BC (Mũi 2)', time: '8 tháng', done: false, date: '' },
    { id: 14, name: 'Sởi (Mũi 1)', time: '9 tháng', done: false, date: '' },
    { id: 15, name: 'Viêm não Nhật Bản (Mũi 1)', time: '9 tháng', done: false, date: '' },
    { id: 16, name: 'Sởi-Quai bị-Rubella', time: '12 tháng', done: false, date: '' },
    { id: 17, name: 'Thủy đậu (Mũi 1)', time: '12 tháng', done: false, date: '' },
    { id: 18, name: 'Viêm gan A (Mũi 1)', time: '12 tháng', done: false, date: '' },
    { id: 19, name: '6 trong 1 (Mũi 4)', time: '18 tháng', done: false, date: '' },
    { id: 20, name: 'Phế cầu (Mũi 4)', time: '18 tháng', done: false, date: '' }
];

const KNOWLEDGE_BASE = [
    { id: 'nutri-1', tag: 'Dinh dưỡng', title: 'Sữa mẹ là tốt nhất', minAge: 0, maxAge: 6, content: 'Trong 6 tháng đầu, bé chỉ cần sữa mẹ hoàn toàn. Mẹ nên ăn đủ các nhóm chất, uống nhiều nước và nghỉ ngơi để đảm bảo nguồn sữa dồi dào.' },
    { id: 'dev-1', tag: 'Phát triển', title: 'Tummy Time (Nằm sấp)', minAge: 1, maxAge: 4, content: 'Cho bé nằm sấp vài phút mỗi ngày dưới sự giám sát của mẹ để giúp bé cứng cổ và phát triển cơ bắp vùng vai, lưng.' },
    { id: 'nutri-2', tag: 'Dinh dưỡng', title: 'Bắt đầu ăn dặm', minAge: 6, maxAge: 8, content: 'Khi bé tròn 6 tháng, mẹ có thể bắt đầu cho bé ăn dặm với các loại bột loãng hoặc rau củ nghiền mịn. Vẫn duy trì bú sữa mẹ.' },
    { id: 'dev-2', tag: 'Hoạt động', title: 'Trò chơi Ú òa', minAge: 6, maxAge: 12, content: 'Trò chơi này giúp bé hiểu về sự tồn tại của vật thể ngay cả khi không nhìn thấy, đồng thời tăng tính tương tác với cha mẹ.' },
    { id: 'care-1', tag: 'Chăm sóc', title: 'Vệ sinh nướu', minAge: 0, maxAge: 12, content: 'Ngay cả khi chưa mọc răng, mẹ hãy dùng gạc mềm thấm nước muối sinh lý để vệ sinh nướu cho bé mỗi ngày nhé.' }
];

let state = {
    tasks: [
        { id: 'feed', name: 'Cho bé bú/ăn', icon: 'milk', interval: 180, lastDone: null, color: '#FF85A1' },
        { id: 'pump', name: 'Hút sữa mẹ', icon: 'waves', interval: 120, lastDone: null, color: '#74B9FF' },
        { id: 'diaper', name: 'Thay bỉm', icon: 'sparkles', interval: 240, lastDone: null, color: '#A29BFE' }
    ],
    growth: [],
    vaccines: VACCINE_LIST,
    profile: { name: '', dob: '', gender: 'none' }
};

function load() {
    const saved = localStorage.getItem('baby_v11');
    if (saved) {
        const parsed = JSON.parse(saved);
        const mergedVaccines = VACCINE_LIST.map(v => {
            const s = parsed.vaccines?.find(x => x.id === v.id);
            return s ? { ...v, ...s } : v;
        });
        state = { ...state, ...parsed, vaccines: mergedVaccines };
    }
}
function save() { localStorage.setItem('baby_v11', JSON.stringify(state)); }

// --- Audio System ---
const audioState = {
    current: null,
    context: null,
    source: null,
    playing: null,
    alertInterval: null
};

window.toggleAudio = (type) => {
    if (audioState.playing === type) { stopAudio(); return; }
    stopAudio(); playAudio(type);
};

function stopAudio() {
    if (audioState.playing) {
        const btn = document.getElementById(`btn-noise-${audioState.playing}`);
        if(btn) btn.classList.remove('playing');
        if (audioState.source && audioState.source.stop) {
            try { audioState.source.stop(); } catch(e) {}
            audioState.source = null;
        }
        if (audioState.alertInterval) { clearInterval(audioState.alertInterval); audioState.alertInterval = null; }
        audioState.playing = null;
        document.getElementById('stop-alarm-container')?.classList.add('hidden');
    }
}

function playAudio(type) {
    if (!audioState.context) audioState.context = new (window.AudioContext || window.webkitAudioContext)();
    const btn = document.getElementById(`btn-noise-${type}`);
    if(btn) btn.classList.add('playing');
    audioState.playing = type;

    if (type === 'music') {
        const music = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        music.loop = true; music.play();
        audioState.source = { stop: () => { music.pause(); music.currentTime = 0; } };
        return;
    }

    const bufferSize = 2 * audioState.context.sampleRate;
    const noiseBuffer = audioState.context.createBuffer(1, bufferSize, audioState.context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * (type === 'rain' ? 0.2 : 0.1) * (type === 'shush' ? Math.sin(i * 0.01) : 1);
    }
    const source = audioState.context.createBufferSource();
    source.buffer = noiseBuffer; source.loop = true;
    const filter = audioState.context.createBiquadFilter();
    filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
    filter.frequency.value = type === 'shush' ? 1000 : 400;
    source.connect(filter); filter.connect(audioState.context.destination);
    source.start(); audioState.source = source;
}

// 30s Synthesized Melody for Alerts
function playAlert() {
    if (audioState.playing === 'alert') return;
    stopAudio();
    audioState.playing = 'alert';
    document.getElementById('stop-alarm-container')?.classList.remove('hidden');

    if (!audioState.context) audioState.context = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioState.context;
    
    let noteIndex = 0;
    const melody = [440, 554.37, 659.25, 880, 659.25, 554.37]; // A Major arpeggio
    
    const playNote = () => {
        if (audioState.playing !== 'alert') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(melody[noteIndex % melody.length], ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start(); osc.stop(ctx.currentTime + 1);
        noteIndex++;
    };

    playNote();
    audioState.alertInterval = setInterval(playNote, 1000);

    // Stop after 30 seconds
    setTimeout(() => { if (audioState.playing === 'alert') stopAudio(); }, 30000);
}

// --- Navigation ---
window.switchTab = (tab, element) => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    element.classList.add('active');
    const titles = { reminders: 'Nhắc nhở', growth: 'Phát triển', vaccine: 'Tiêm chủng', knowledge: 'Cẩm nang', profile: 'Hồ sơ' };
    document.getElementById('page-title').textContent = titles[tab];
    if (tab === 'reminders') renderTasks();
    if (tab === 'growth') renderGrowth();
    if (tab === 'vaccine') renderVaccines();
    if (tab === 'knowledge') renderKnowledge();
    if (tab === 'profile') renderProfile();
    window.scrollTo(0, 0);
};

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => switchTab(item.getAttribute('data-tab'), item));
});

// --- Knowledge ---
function renderKnowledge() {
    const list = document.getElementById('knowledge-list');
    let age = 0;
    if (state.profile.dob) age = Math.floor((Date.now() - new Date(state.profile.dob).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    const filtered = KNOWLEDGE_BASE.filter(k => age >= k.minAge && age <= k.maxAge);
    list.innerHTML = filtered.map(k => `<div class="tip-card"><span class="tip-tag">${k.tag}</span><div class="tip-title">${k.title}</div><div class="tip-content">${k.content}</div></div>`).join('') || '<p style="text-align:center; color:#999;">Cập nhật ngày sinh bé mẹ nhé!</p>';
}

// --- Reminders ---
function renderTasks() {
    const grid = document.getElementById('task-grid');
    grid.innerHTML = state.tasks.map(t => {
        const left = getLeft(t), prog = getProg(t);
        return `
            <div class="card" id="card-${t.id}">
                <div style="background: ${t.color}15; padding: 25px; border-radius: 30px; margin-bottom: 15px;">
                    <i data-lucide="${t.icon}" style="color: ${t.color}; width: 35px; height: 35px;"></i>
                </div>
                <h2 style="font-weight: 700;">${t.name}</h2>
                <div style="font-size: 0.85rem; color: #666; margin-top: 5px;">Mỗi ${Math.floor(t.interval/60)}h ${t.interval%60}m</div>
                <div class="timer-wrap">
                    <svg class="timer-svg" width="180" height="180">
                        <circle class="circle-bg" cx="90" cy="90" r="80"></circle>
                        <circle class="circle-bar" cx="90" cy="90" r="80" style="stroke-dasharray: 502; stroke-dashoffset: ${502*(1-prog)}; stroke: ${t.color};"></circle>
                    </svg>
                    <div class="timer-text">${fmt(left)}</div>
                </div>
                <button class="btn" onclick="done('${t.id}')" style="background: ${t.color}; box-shadow: 0 10px 20px ${t.color}44">
                    <i data-lucide="check-circle"></i> Hoàn thành
                </button>
            </div>
        `;
    }).join('');
    lucide.createIcons();
    updateProfileSummary();
}
const getLeft = (t) => t.lastDone ? Math.max(0, Math.floor((t.lastDone + t.interval*60*1000 - Date.now())/1000)) : 0;
const getProg = (t) => t.lastDone ? getLeft(t) / (t.interval*60) : 0;
const fmt = (s) => s <= 0 ? "Đến lúc!" : (Math.floor(s/3600) > 0 ? `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m` : `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`);

window.done = (id) => { const t = state.tasks.find(x => x.id === id); if (t) { t.lastDone = Date.now(); save(); renderTasks(); if (audioState.playing === 'alert') stopAudio(); } };

// --- Profile & Modal ---
window.saveProfile = () => {
    state.profile.name = document.getElementById('baby-name').value;
    state.profile.dob = document.getElementById('baby-dob').value;
    state.profile.gender = document.getElementById('baby-gender').value;
    save(); alert('Đã lưu hồ sơ của bé!'); switchTab('reminders', document.querySelector('[data-tab=reminders]'));
};
function renderProfile() { document.getElementById('baby-name').value = state.profile.name; document.getElementById('baby-dob').value = state.profile.dob; document.getElementById('baby-gender').value = state.profile.gender; }
function updateProfileSummary() {
    const summary = document.getElementById('profile-summary');
    if (state.profile.name) {
        summary.classList.remove('hidden'); document.getElementById('summary-name').textContent = state.profile.name;
        if (state.profile.dob) {
            const m = Math.floor((Date.now() - new Date(state.profile.dob).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
            document.getElementById('summary-age').textContent = `${m} tháng tuổi`;
        }
    } else summary.classList.add('hidden');
}

const modal = document.getElementById('settings-modal');
document.getElementById('settings-btn').onclick = () => {
    document.getElementById('settings-list').innerHTML = state.tasks.map(t => `<div class="input-group" style="margin-bottom: 20px;"><label>${t.name} (phút)</label><input type="number" id="int-${t.id}" value="${t.interval}"></div>`).join('');
    modal.classList.remove('hidden');
};
document.getElementById('close-modal').onclick = () => modal.classList.add('hidden');
document.getElementById('settings-form').onsubmit = (e) => { e.preventDefault(); state.tasks.forEach(t => { t.interval = parseInt(document.getElementById(`int-${t.id}`).value); }); save(); renderTasks(); modal.classList.add('hidden'); };

// --- Main Loop ---
setInterval(() => {
    const now = new Date();
    state.tasks.forEach(t => {
        if (t.lastDone && getLeft(t) === 0 && !t.notified) { notify(`Đến lúc ${t.name}!`, `Lịch ${t.name} cho bé mẹ nhé.`); playAlert(); t.notified = true; } 
        else if (t.lastDone && getLeft(t) > 0) t.notified = false;
    });
    state.vaccines.forEach(v => {
        if (v.date && !v.done) {
            const diff = Math.ceil((new Date(v.date) - now) / (1000 * 60 * 60 * 24));
            if (diff === 2 && !v.notified2Days) { notify(`Hẹn tiêm chủng`, `2 ngày nữa bé tiêm ${v.name} mẹ nhé!`); v.notified2Days = true; save(); }
            if (diff === 0 && !v.notifiedToday) { notify(`Tiêm chủng hôm nay`, `Hôm nay bé tiêm ${v.name} mẹ nhé!`); playAlert(); v.notifiedToday = true; save(); }
        }
    });
    if (document.getElementById('tab-reminders').classList.contains('active')) {
        state.tasks.forEach(t => { const card = document.getElementById(`card-${t.id}`); if (card) { const left = getLeft(t), prog = getProg(t); card.querySelector('.circle-bar').style.strokeDashoffset = 502 * (1 - prog); card.querySelector('.timer-text').textContent = fmt(left); } });
    }
}, 1000);

function notify(title, body) { if (Notification.permission === 'granted') { new Notification(title, { body, icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png' }); } }

window.onload = () => {
    load(); renderTasks();
    if (Notification.permission !== 'granted') document.getElementById('notification-banner').classList.remove('hidden');
    document.getElementById('enable-notifications').onclick = () => { Notification.requestPermission().then(p => { if (p==='granted') document.getElementById('notification-banner').classList.add('hidden'); }); };
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
};

window.stopAlert = () => stopAudio();
