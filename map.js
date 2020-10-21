//variables
const submitBtn = document.getElementById('submitBtn');
//initialize map 
let map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

async function getLocation(address) {
    try {
        let result = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_5CKDFC47alkp5FF4m1DykpVohZyh5&ipAddress=${address}`);
        let data = await result.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderMap(result) {
    let latitude = result.location.lat;
    let longtitude = result.location.lng;
    let isp = result.isp;
    let timezone = result.location.timezone;
    let ip = result.ip;

    map.remove();

    map = L.map('map').setView([latitude, longtitude], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longtitude]).addTo(map)
        .bindPopup(`ISP: ${isp} <br> Timezone: ${timezone} <br> IP: ${ip}`)
        .openPopup();
}


submitBtn.addEventListener('click', function () {
    const input = document.getElementById('input');
    getLocation(input.value).then((result) => {
        if (result.code === 422) {
            errorToast(result.messages);
        } else {
            renderMap(result);
        }

    });
});

function errorToast(error) {
    const header = document.querySelector('.header');
    const p = document.createElement('p');

    p.classList.add('error-message');
    p.textContent = `${error}`;
    header.appendChild(p);
    setTimeout(function () {
        p.remove();
    }, 1500)
}