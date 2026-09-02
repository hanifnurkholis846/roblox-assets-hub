// DATA ASET (CUMA 2 ASET GRATIS YANG TAMPIL)
const aset = [
    // ===== ASET GRATIS (FREE) - CUMA 2 YANG PUNYA FILE ===== 
    { id: 1, nama: '🏠 Summit Kit', kategori: 'Model 3D', harga: 0, icon: '🏠' },
    { id: 2, nama: '🌴 Hangout Kit', kategori: 'Model 3D', harga: 0, icon: '🌴' },

    // ===== SEMENTARA YANG LAIN DIKOSONGKAN DULU ===== 
    // { id: 3, nama: '⚔️ Pedang Legend', kategori: 'Mesh', harga: 3000, icon: '⚔️' },
    // { id: 4, nama: '🛡️ Perisai Emas', kategori: 'Mesh', harga: 0, icon: '🛡️' },
    // { id: 5, nama: '🎵 Lagu Epic', kategori: 'Audio', harga: 2000, icon: '🎵' },
    // { id: 6, nama: '✨ Auto-Save Script', kategori: 'Script', harga: 0, icon: '📜' },
    // { id: 7, nama: '🔧 Builder Plugin', kategori: 'Plugin', harga: 8000, icon: '🔧' },
    // { id: 8, nama: '⚡ Speed Boost Plugin', kategori: 'Plugin', harga: 0, icon: '⚡' },
    // { id: 9, nama: '🎯 Aim Assist Plugin', kategori: 'Plugin', harga: 12000, icon: '🎯' }
];

let tabAktif = 'free';
let keywordPencarian = '';

function filterAset(kategori, keyword = '') {
    let hasil = [];
    
    if (kategori === 'free') {
        hasil = aset.filter(a => a.harga === 0);
    } else if (kategori === 'paid') {
        hasil = aset.filter(a => a.harga > 0);
    } else if (kategori === 'plugin') {
        hasil = aset.filter(a => a.kategori === 'Plugin');
    }
    
    if (keyword.trim() !== '') {
        const kw = keyword.toLowerCase().trim();
        hasil = hasil.filter(a => 
            a.nama.toLowerCase().includes(kw) || 
            a.kategori.toLowerCase().includes(kw)
        );
    }
    
    return hasil;
}

function renderAset(kategori, containerId, keyword = '') {
    const container = document.getElementById(containerId);
    const filtered = filterAset(kategori, keyword);
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center;opacity:0.5;padding:40px;">😅 Tidak ada aset yang cocok!</p>';
        return;
    }
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const hargaText = item.harga === 0 
            ? '<span class="harga gratis">💰 GRATIS</span>' 
            : `<span class="harga berbayar">💰 Rp ${item.harga.toLocaleString()}</span>`;
        
        const tombol = item.harga === 0
            ? `<button class="tombol download" onclick="downloadAset(${item.id})">⬇️ Download</button>`
            : `<button class="tombol beli" onclick="beliAset(${item.id})">🛒 Beli</button>`;
        
        card.innerHTML = `
            <div class="gambar">${item.icon}</div>
            <h3>${item.nama}</h3>
            <div class="kategori">${item.kategori}</div>
            ${hargaText}
            ${tombol}
        `;
        
        container.appendChild(card);
    });
}

function updateBadges() {
    const freeCount = aset.filter(a => a.harga === 0).length;
    const paidCount = aset.filter(a => a.harga > 0).length;
    const pluginCount = aset.filter(a => a.kategori === 'Plugin').length;
    
    document.getElementById('badge-free').textContent = freeCount;
    document.getElementById('badge-paid').textContent = paidCount;
    document.getElementById('badge-plugin').textContent = pluginCount;
}

function switchTab(tab) {
    tabAktif = tab;
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    renderAllTabs(keywordPencarian);
}

function searchAset() {
    const input = document.getElementById('searchInput');
    keywordPencarian = input.value;
    renderAllTabs(keywordPencarian);
}

function renderAllTabs(keyword = '') {
    renderAset('free', 'daftarFree', keyword);
    renderAset('paid', 'daftarPaid', keyword);
    renderAset('plugin', 'daftarPlugin', keyword);
}

// ===== FUNGSI DOWNLOAD (PAKAI LINK GOOGLE DRIVE) =====
function downloadAset(id) {
    const linkDownload = {
        1: 'https://drive.google.com/uc?export=download&id=1yBE8bIA_50rliPQ_WviLEeeQTHKXuwUS', // Summit Kit
        2: 'https://drive.google.com/uc?export=download&id=1GkdDt3Ir8a0PCmLbRsZ6abRGWJnuLqRV'  // Hangout Kit
    };

    const item = aset.find(a => a.id === id);
    if (!item) {
        alert('Aset tidak ditemukan!');
        return;
    }

    const url = linkDownload[id];
    if (url) {
        window.open(url, '_blank');
    } else {
        alert(`Link download untuk "${item.nama}" belum tersedia.`);
    }
}

function beliAset(id) {
    const item = aset.find(a => a.id === id);
    alert(`🛒 Kamu mau beli "${item.nama}" seharga Rp ${item.harga.toLocaleString()}?\n\nArahkan ke WhatsApp/DM admin untuk proses pembayaran.`);
}

// ===== INITIALISASI =====
updateBadges();
renderAllTabs('');
