const trilhaAventura = [
    { nome: "Fazenda Monte Bello", lat: -23.219201, lng: -49.759417 },
    { nome: "Ponte Pênsil", lat: -23.098811, lng: -49.742955 },
    { nome: "Morro do Gavião", lat: -23.241006, lng: -49.695877 },
    { nome: "Pedra do Índio", lat: -23.228086, lng: -49.678255 },
    { nome: "Prainha Camping", lat: -23.262455, lng: -49.700248 }
];

const trilhaHospedagem = [
    { nome: "Tayaya", lat: -23.195125, lng: -49.683385, ishtml:'tayaya.html' },
    { nome: "Daj Resort", lat: -23.295761, lng: -49.736630, ishtml:'daj.html' },
    { nome: "Pousada Victor", lat: -23.197607, lng: -49.757993, ishtml:'pousada_vitor.html' },
    { nome: "Pousada Ruvina", lat: -23.280173, lng: -49.806206 },
    { nome: "Ilha do Béca", lat: -23.186667, lng: -49.684243, ishtml:'ilha_do_beca.html' },
    { nome: "Ilha 54", lat: -23.168182, lng: -49.683743, ishtml:'ilha54.html' },
    { nome: "Villa Bueno", lat: -23.183964, lng: -49.683397, ishtml:'vila_bueno.html' },
    { nome: "Rancho da Colina", lat: -23.180217, lng: -49.693027 },
    { nome: "Marina Angra", lat: -23.183418, lng: -49.700253 },
    { nome: "Fazenda Pinhalzinho", lat: -23.164416, lng: -49.750124 },
    { nome: "Villa Nova", lat: -23.198247, lng: -49.755459 },
    { nome: "Fazenda Platina", lat: -23.219241, lng: -49.802912 }
];

const trilhaGastronomia = [
    { nome: "Pedra do Índio", lat: -23.22925864786942, lng: -49.67692854604166 },
    { nome: "Blue Moon", lat: -23.19668601903206, lng: -49.757500485562, ishtml:'bluemoon.html' },
    { nome: "Ki-delícia", lat: -23.191686018703877, lng: -49.7577207178735 },
    { nome: "Tucão", lat: -23.196665975175157, lng: -49.754784204299196 },
    { nome: "Magnata", lat: -23.198361503991475, lng: -49.757240361971014 },
    { nome: "Divino Sabor", lat: -23.19475139919245, lng: -49.75811871916535 },
    { nome: "Chef Adriano", lat: -23.19862807608063, lng: -49.75339923498804,ishtml:'chefadriano.html' },
    { nome: "Recanto da Cascata", lat: -23.187519684390224, lng: -49.71055479265805 },
    { nome: "Parada da Serra", lat: -23.27476717000394, lng: -49.75163014398363 },
    { nome: "Queijaria Bela Vista", lat: -23.33101479632104, lng: -49.8360618331078, ishtml:'queijaria.html' }
];

const gastronomiaIcon = L.icon({
    iconUrl: '../assets/img/icon-gastronomia.png',
    iconSize: [30, 35],         // largura x altura
    iconAnchor: [9, 18],          // base central do ícone
    popupAnchor: [0, -18]          // popup acima do ícone
});


const hospedagemIcon = L.icon({
    iconUrl: '../assets/img/icon-hospedagem.png',
    iconSize: [30, 35],         // largura x altura
    iconAnchor: [9, 18],          // base central do ícone
    popupAnchor: [0, -18]          // popup acima do ícone
});

const aventuraIcon = L.icon({
    iconUrl: '../assets/img/icon-aventura.png',
    iconSize: [30, 35],         // largura x altura
    iconAnchor: [9, 18],          // base central do ícone
    popupAnchor: [0, -18]          // popup acima do ícone
});

const rota = document.getElementById("rota")
rota.addEventListener("change", () => {
    const tipoSelecionado = rota.value;
    horaAventura(tipoSelecionado);
});

function horaAventura(tipo) {
    switch (tipo) {
        case "TrilhaAventura":
            addMaker(trilhaAventura, iconf = aventuraIcon);
            break;
        case "TrilhaHospedagem":
            addMaker(trilhaHospedagem, iconf = hospedagemIcon);
            break;
        case "TrilhaGastronomia":
            addMaker(trilhaGastronomia, iconf = gastronomiaIcon);
            break;
    }
}



const map = L.map('map').setView([-23.1939, -49.7578], 15)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



let grupoDeRotas = L.layerGroup().addTo(map);

function limparRotas() {
    grupoDeRotas.clearLayers();
}

function mapear(lista) {
    limparRotas();

    for (let i = 0; i < lista.length - 1; i++) {
        const waypoints = [
            L.latLng(lista[i][0], lista[i][1]),
            L.latLng(lista[i+1][0], lista[i+1][1])
        ];

        const control = L.Routing.control({
            waypoints: waypoints,
            createMarker: () => null,
            addWaypoints: false,
            routeWhileDragging: false,
            draggableWaypoints: false,
            show: false,
            router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        alternatives: false   // força rota única
    })
        });

        // quando a rota for encontrada, desenha a linha
        control.on('routesfound', function(e) {
            const route = e.routes[0];
            const line = L.Routing.line(route, {
                styles: [{ color: 'red', weight: 4 }]
            });
            grupoDeRotas.addLayer(line);

            // remove o controle invisível para não acumular
            map.removeControl(control);
        });

        control.addTo(map);
    }
}

function addMaker(trilha, iconf){ 
    limparMarcadores();
    const lista = [];

    for (let i = 0; i < trilha.length; i++) { 
        const x = L.marker([trilha[i].lat, trilha[i].lng], { icon: iconf }).addTo(map); 
        x.bindPopup(`<b>${trilha[i].nome}</b><br>
            <a href=${getHtml(trilha[i])}>Saiba mais</a>`); 
        lista.push([trilha[i].lat, trilha[i].lng]);
    }

    mapear(lista);
}

function getHtml(x){
    if((!('ishtml' in x))){
        return 'https://ribeiraoclaro.pr.gov.br/'
    }else{
        return x.ishtml
    }
}

function limparMarcadores() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

