// Forzar actualización de la caché limpiando versiones viejas del Service Worker
if ('serviceWorker' in navigator) {
    caches.keys().then(names => {
        for (let name of names) caches.delete(name);
    });
}

// Listado de usuarios autorizados
const usuariosPermitidos = {
    "juan carlos": "1313",
    "user": "admin"
};

// Base de datos inicial (Incluye el Ascensor 52 corregido y completo)
const ascensoresIniciales = [
    { id: "1", uso: "EDIF. INVESTIGACION", tipo: "Montacamillas 9-Par 1050Kg", rae: "46/63556", imei: "353656104783206", tlf: "5901005190178" },
    { id: "2", uso: "EDIF. INVESTIGACION", tipo: "Montacamillas 9-Par 1050Kg", rae: "46/63557", imei: "353656104782844", tlf: "5901000410273" },
    { id: "3", uso: "EDIF. INVESTIGACION", tipo: "Montacamillas 10-Par 1050Kg", rae: "46/63555", imei: "356874087109029", tlf: "5901005201551" },
    { id: "4", uso: "EDIF. INVESTIGACION", tipo: "Montacamillas 10-Par 1050Kg", rae: "46/63544", imei: "353656105110011", tlf: "5901007486071" },
    { id: "5", uso: "MORTUORIO", tipo: "Montacamillas 3-Par 1600Kg", rae: "46/62992", imei: "353656104822533", tlf: "5901000325911" },
    { id: "8", uso: "C. EXT. PACIENTES", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/62995", imei: "353656101828483", tlf: "5901000532801" },
    { id: "9", uso: "C. EXT. PACIENTES", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/62996", imei: "353656104783396", tlf: "5901008150449" },
    { id: "10", uso: "C. EXT. PACIENTES", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/62997", imei: "357803047527631", tlf: "5901000143567" },
    { id: "11", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/62998", imei: "353656105080503", tlf: "5901000703216" },
    { id: "12", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/62999", imei: "353656101501395", tlf: "5901008952369" },
    { id: "13", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63000", imei: "353656104782364", tlf: "5901000500763" },
    { id: "14", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63001", imei: "353656101642983", tlf: "5901000532570" },
    { id: "15", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63002", imei: "353656104779998", tlf: "5901000582737" },
    { id: "16", uso: "C. EXT. PACIENTES", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63003", imei: "356945327109712", tlf: "5901000426563" },
    { id: "17", uso: "C. EXT. PACIENTES", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63004", imei: "353656101604538", tlf: "5901010485151" },
    { id: "18", uso: "C. EXT. PACIENTES", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63005", imei: "357976064308216", tlf: "5901007646544" },
    { id: "19", uso: "URG. - Q. - UCI", tipo: "Montacamillas 3-Par 1600Kg", rae: "46/63006", imei: "353656105365243", tlf: "5901007061480" },
    { id: "20", uso: "URG. - Q. - UCI", tipo: "Montacamillas 3-Par 1600Kg", rae: "46/63007", imei: "353656105086575", tlf: "5901000468360" },
    { id: "22", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63481", imei: "353656104782307", tlf: "5901000768740" },
    { id: "23", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63480", imei: "353656104782406", tlf: "5901000477454" },
    { id: "24", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63482", imei: "353656104783321", tlf: "5901000407930" },
    { id: "25", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63523", imei: "353656105097903", tlf: "5901005202191" },
    { id: "26", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63524", imei: "353656101868471", tlf: "5901000477464" },
    { id: "27", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63576", imei: "353656105075966", tlf: "5901009414344" },
    { id: "28", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63577", imei: "353656105082228", tlf: "5901009214352" },
    { id: "31", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63520", imei: "356945322615069", tlf: "5901000096099" },
    { id: "32", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63522", imei: "353656105127312", tlf: "5901000474343" },
    { id: "33", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63521", imei: "353656104783388", tlf: "5901007130859" },
    { id: "34", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63519", imei: "353656104782836", tlf: "5901010312193" },
    { id: "35", uso: "PERSONAL Y PACIENTES", tipo: "GPS-3W 10 paradas 3000Kg", rae: "46/63573", imei: "357976061428793", tlf: "5901000143055" },
    { id: "36", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63455", imei: "353656104779873", tlf: "5901005976169" },
    { id: "37", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63525", imei: "353656101837021", tlf: "5901000515774" },
    { id: "38", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63558", imei: "353656105080008", tlf: "5901010297546" },
    { id: "39", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63477", imei: "353656105125498", tlf: "5901000468159" },
    { id: "40", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63527", imei: "353656105121455", tlf: "5901007060382" },
    { id: "41", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63526", imei: "353656101871905", tlf: "5901008440398" },
    { id: "44", uso: "HEMOD. - UCSI - H.DIA", tipo: "Asc Publico 2-Par 830Kg", rae: "46/63578", imei: "353656105357455", tlf: "5901009011850" },
    { id: "45", uso: "HEMOD. - UCSI - H.DIA", tipo: "Asc Publico 2-Par 830Kg", rae: "46/63579", imei: "353656105097390", tlf: "5901007132523" },
    { id: "46", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63514", imei: "356945322617354", tlf: "5901000403929" },
    { id: "47", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63458", imei: "353656101683755", tlf: "5901009797396" },
    { id: "48", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63679", imei: "353656104783198", tlf: "5901005584531" },
    { id: "49", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63485", imei: "353656101645499", tlf: "5901000473535" },
    { id: "50", uso: "INGRESO PACIENTES / VISITAS", tipo: "Montacamillas 9-Par 1600Kg / 8-Par 1050Kg", rae: "46/63484", imei: "353656105121216 / 353656101861435", tlf: "5901000532826 / 5901000515390" },
    { id: "51", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63516", imei: "353656105098505", tlf: "5901000454753" },
    { id: "52", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63515", imei: "Sin registrar", tlf: "Sin registrar" },
    { id: "55", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63559", imei: "353656101840231", tlf: "5901000467990" },
    { id: "56", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63560", imei: "353656105097382", tlf: "5901007206966" },
    { id: "57", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63561", imei: "353656101638379", tlf: "5901000443317" },
    { id: "58", uso: "MONTACARGAS/SUMINISTROS", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63562", imei: "353656105127619", tlf: "5901010222876" },
    { id: "59", uso: "PERSONAL Y PACIENTES", tipo: "GPS-3W 10 paradas 3000Kg", rae: "46/63575", imei: "356945322627304", tlf: "5901000166673" },
    { id: "60", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63563", imei: "353656101606160", tlf: "5901009692755" },
    { id: "61", uso: "PERSONAL Y PACIENTES", tipo: "Montacamillas 10-Par 1600Kg", rae: "46/63513", imei: "353656101663666", tlf: "5901000582066" },
    { id: "62", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63470", imei: "353656101606178", tlf: "5901000479591" },
    { id: "63", uso: "INGRESO PACIENTES", tipo: "Montacamillas 9-Par 1600Kg", rae: "46/63528", imei: "353713118142653", tlf: "5901000484238" },
    { id: "64", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63518", imei: "353656104782380", tlf: "5901000571314" },
    { id: "65", uso: "VISITAS", tipo: "Montacamillas 8-Par 1050Kg", rae: "46/63517", imei: "353656104782372", tlf: "5901000407904" },
    { id: "68", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 2-Par 830Kg", rae: "46/63456", imei: "353656104780061", tlf: "5901000443189" },
    { id: "69", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 3-Par 830Kg", rae: "46/63574", imei: "353656104783354", tlf: "5901007206582" },
    { id: "70", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 3-Par 830Kg", rae: "46/63454", imei: "353656101639781", tlf: "5901007670193" },
    { id: "71", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 3-Par 830Kg", rae: "46/63460", imei: "353656104783230", tlf: "5901000150117" },
    { id: "72", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 3-Par 830Kg", rae: "46/63459", imei: "353656101639401", tlf: "5901000578837" },
    { id: "73", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 3-Par 830Kg", rae: "46/63461", imei: "353656101683797", tlf: "5901000566034" },
    { id: "74", uso: "EDIF. ADMNISTRACIÓN - DOCENCIA", tipo: "Asc Publico 3-Par 830Kg", rae: "46/63463", imei: "353656104783107", tlf: "5901000459553" },
    { id: "75", uso: "ESTERILIZACIÓN", tipo: "Montacarros 2-Par 830Kg", rae: "46/63009", imei: "353656104782075", tlf: "5901000478230" },
    { id: "76", uso: "ESTERILIZACIÓN", tipo: "Montacarros 2-Par 830Kg", rae: "46/63564", imei: "353656101500884", tlf: "5901007066414" },
    { id: "82", uso: "RADIOTERAPIA", tipo: "Montacamillas 2-Par 1600Kg", rae: "46/63010", imei: "353656104783065", tlf: "5901000463559" },
    { id: "83", uso: "ANIMALARIO", tipo: "Montacamillas 2-Par 1600Kg", rae: "46/67042", imei: "353656104782240", tlf: "5901000145103" }
];

// Unificado el uso de 'lafe_asc_data' tanto para leer como para escribir
let ascensoresData = JSON.parse(localStorage.getItem('lafe_asc_data')) || ascensoresIniciales;
let currentEditId = null;

const loginScreen = document.getElementById('login-screen');
const appContent = document.getElementById('app-content');
const loginError = document.getElementById('login-error');
const container = document.getElementById('ascensores-container');
const searchInput = document.getElementById('search-input');
const stats = document.getElementById('stats');
const modal = document.getElementById('edit-modal');

// Gestión de Login
document.getElementById('btn-login').addEventListener('click', ejecutarLogin);
function ejecutarLogin() {
    const userIn = document.getElementById('username').value.toLowerCase().trim();
    const passIn = document.getElementById('password').value;

    if (usuariosPermitidos[userIn] && usuariosPermitidos[userIn] === passIn) {
        localStorage.setItem('lafe_session', 'active');
        loginScreen.style.display = 'none';
        appContent.style.display = 'block';
        renderAscensores(ascensoresData);
    } else {
        loginError.style.display = 'block';
    }
}

document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('lafe_session');
    loginScreen.style.display = 'flex';
    appContent.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    loginError.style.display = 'none';
});

// Comprobar sesión al cargar (Corregido: ahora renderiza los datos directamente al recordar sesión)
if (localStorage.getItem('lafe_session') === 'active') {
    loginScreen.style.display = 'none';
    appContent.style.display = 'block';
    renderAscensores(ascensoresData);
}

function renderAscensores(data) {
    container.innerHTML = '';
    stats.textContent = `Mostrando ${data.length} de ${ascensoresData.length} ascensores`;
    if(data.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px; color:#8e8e93;">No se encontraron resultados.</p>';
        return;
    }
    data.forEach(asc => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Preparar botón verde de llamar si el teléfono es válido
        let tlfHtml = `<span class="value">${asc.tlf}</span>`;
        if (asc.tlf && asc.tlf !== "Sin registrar") {
            const primerNumero = asc.tlf.split(' / ')[0].trim();
            tlfHtml = `
                <div class="phone-container">
                    <span class="value">${asc.tlf}</span>
                    <a href="tel:${primerNumero}" class="btn-call"><i data-lucide="phone"></i>Llamar</a>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-header">
                <div class="header-left">
                    <div class="card-title">Ascensor ${asc.id}</div>
                    <button class="btn-edit" onclick="abrirEditor('${asc.id}')"><i data-lucide="edit-3"></i></button>
                </div>
                <div class="rae-badge">RAE ${asc.rae}</div>
            </div>
            <div class="card-body">
                <div class="info-row"><i data-lucide="map-pin"></i><span class="label">Uso/Ubi:</span><span class="value">${asc.uso}</span></div>
                <div class="info-row"><i data-lucide="info"></i><span class="label">Detalles:</span><span class="value">${asc.tipo}</span></div>
                <div class="info-row"><i data-lucide="cpu"></i><span class="label">IMEI:</span><span class="value">${asc.imei}</span></div>
                <div class="info-row"><i data-lucide="phone"></i><span class="label">Línea Tlf:</span>${tlfHtml}</div>
                <div class="info-row"><i data-lucide="lock"></i><span class="label">PIN SIM:</span><span class="value">1313</span></div>
            </div>
        `;
        container.appendChild(card);
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Ventana Modal para Editar
window.abrirEditor = function(id) {
    currentEditId = id;
    const asc = ascensoresData.find(a => a.id === id);
    if(asc) {
        document.getElementById('modal-title').textContent = `Editar Ascensor ${id}`;
        document.getElementById('edit-uso').value = asc.uso;
        document.getElementById('edit-tipo').value = asc.tipo;
        document.getElementById('edit-imei').value = asc.imei;
        document.getElementById('edit-tlf').value = asc.tlf;
        modal.style.display = 'flex';
    }
}

document.getElementById('btn-cancel-edit').addEventListener('click', () => modal.style.display = 'none');

document.getElementById('btn-save-edit').addEventListener('click', () => {
    const idx = ascensoresData.findIndex(a => a.id === currentEditId);
    if(idx !== -1) {
        ascensoresData[idx].uso = document.getElementById('edit-uso').value;
        ascensoresData[idx].tipo = document.getElementById('edit-tipo').value;
        ascensoresData[idx].imei = document.getElementById('edit-imei').value;
        ascensoresData[idx].tlf = document.getElementById('edit-tlf').value;
        
        // Corregido: Guarda usando la misma clave que lee arriba ('lafe_asc_data')
        localStorage.setItem('lafe_asc_data', JSON.stringify(ascensoresData));
        modal.style.display = 'none';
        renderAscensores(ascensoresData);
    }
});

// Buscador en tiempo real
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = ascensoresData.filter(asc => 
        asc.id.toLowerCase().includes(term) ||
        asc.uso.toLowerCase().includes(term) ||
        asc.tipo.toLowerCase().includes(term) ||
        asc.rae.toLowerCase().includes(term) ||
        asc.imei.toLowerCase().includes(term) ||
        asc.tlf.toLowerCase().includes(term)
    );
    renderAscensores(filtered);
});

// Render inicial preventivo por si no hay sesión activa previa
renderAscensores(ascensoresData);
