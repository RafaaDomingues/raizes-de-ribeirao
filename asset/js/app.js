const trilhaAventura = [
    { nome: "Fazenda Monte Bello", lat: -23.219201, lng: -49.759417 },
    { nome: "Ponte Pênsil", lat: -23.098811, lng: -49.742955 },
    { nome: "Morro do Gavião", lat: -23.241006, lng: -49.695877 },
    { nome: "Pedra do Índio", lat: -23.228086, lng: -49.678255 },
    { nome: "Prainha Camping", lat: -23.262455, lng: -49.700248 }
];

const trilhaHospedagem = [
    { nome: "Tayaya", lat: -23.195125, lng: -49.683385 },
    { nome: "Daj Resort", lat: -23.295761, lng: -49.736630 },
    { nome: "Pousada Victor", lat: -23.197607, lng: -49.757993 },
    { nome: "Pousada Ruvina", lat: -23.280173, lng: -49.806206 },
    { nome: "Ilha do Bêca", lat: -23.186667, lng: -49.684243 },
    { nome: "Ilha 54", lat: -23.168182, lng: -49.683743 },
    { nome: "Villa Bueno", lat: -23.183964, lng: -49.683397 },
    { nome: "Rancho da Colina", lat: -23.180217, lng: -49.693027 },
    { nome: "Marina Angra", lat: -23.183418, lng: -49.700253 },
    { nome: "Fazenda Pinhalzinho", lat: -23.164416, lng: -49.750124 },
    { nome: "Villa Nova", lat: -23.198247, lng: -49.755459 },
    { nome: "Fazenda Platina", lat: -23.219241, lng: -49.802912 }
];

const trilhaGastronomia = [
    { nome: "Pedra do Índio", lat: -23.22925864786942, lng: -49.67692854604166 },
    { nome: "Blue Moon", lat: -23.19668601903206, lng: -49.757500485562 },
    { nome: "Ki-delícia", lat: -23.191686018703877, lng: -49.7577207178735 },
    { nome: "Tucão", lat: -23.196665975175157, lng: -49.754784204299196 },
    { nome: "Magnata", lat: -23.198361503991475, lng: -49.757240361971014 },
    { nome: "Divino Sabor", lat: -23.19475139919245, lng: -49.75811871916535 },
    { nome: "Chef Adriano", lat: -23.19862807608063, lng: -49.75339923498804 },
    { nome: "Recanto da Cascata", lat: -23.187519684390224, lng: -49.71055479265805 },
    { nome: "Parada da Serra", lat: -23.27476717000394, lng: -49.75163014398363 },
    { nome: "Queijaria Bela Vista", lat: -23.33101479632104, lng: -49.8360618331078 }
];


function horaAventura(tipo){
    switch (tipo) {
  case "trilhaAventura":
    console.log("Hoje é segunda-feira.");
    break;
  case "TrilhaHospedagem":
    console.log("Hoje é terça-feira.");
    break;
  case "TrilhaGastronomia":
    addGastronomiaMaker();
    break;
}
}



const map = L.map('map' ).setView([-23.1939, -49.7578],15) 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const gastronomiaIcon = L.icon({
  iconUrl: 'cascata.png',
  iconSize:     [19, 18],         // largura x altura
  iconAnchor:   [9, 18],          // base central do ícone
  popupAnchor:  [0, -18]          // popup acima do ícone
});



function addGastronomiaMaker(){
    for(let i = 0; i < trilhaGastronomia.length; i++) {
    L.marker([trilhaGastronomia[i].lat,trilhaGastronomia[i].lng],{ icon: gastronomiaIcon }).addTo(map);
}
}


horaAventura('TrilhaGastronomia')

// pontoA.bindPopup(`
//   <b>Cascata</b><br>
//   <a href="https://ribeiraoclaro.pr.gov.br/" target="_blank">Saiba mais</a>
// `).openPopup();


// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("Anota as cordenadas: " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);



// function mapear(lista){
// L.Routing.control({
//   waypoints: [
//     L.latLng(-23.18764947748166, -49.710488076778944),
//     L.latLng(-23.19694023285064, -49.75810412396544)
//   ],
//    createMarker: () => null, // 👈 isso evita os marcadores automáticos
//   lineOptions: {
//     styles: [{ color: 'red', weight: 4 }]
//   },
//   addWaypoints: false,
//   routeWhileDragging: false,
//   draggableWaypoints: false

// }).addTo(map);

// }

