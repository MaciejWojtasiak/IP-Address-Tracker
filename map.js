//variables
const input = document.getElementById('input');
const submitBtn = document.getElementById('submitBtn');
//initialize map 
let map = L.map('map').setView([51, 22], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

async function getLocation(address) {
    try {
        let result = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_5CKDFC47alkp5FF4m1DykpVohZyh5&domain=${address}`);
        let data = await result.json();
        let location = data.location;
        return location;
    } catch (error) {
        console.log(error);
    }
}

function renderMap(coordinates) {
    let latitude = coordinates.lat;
    let longtitude = coordinates.lng;
    let country = coordinates.country;
    let region = coordinates.region;
    let city = coordinates.city;

    map.remove();

    map = L.map('map').setView([latitude, longtitude], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longtitude]).addTo(map)
        .bindPopup(`Country: ${country} <br> City: ${city} <br> Region: ${region}`)
        .openPopup();
}

submitBtn.addEventListener('click', function () {
    getLocation(input.value).then((result) => {
        renderMap(result);
    });
})



