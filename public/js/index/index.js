
function initMap() {

  var xhr = new XMLHttpRequest();
  var res = [];
  xhr.open("GET", "/get_locations", true);
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      res = eval(this.responseText)

      const key = 'C8ZGxHWriJVfI9l9jy1c';
      const map = L.map('map').setView([37.14, 38.12], 8);
      const gl = L.maplibreGL({
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`
      }).addTo(map);

      for (let i = 0; i < res.length; i++) {
        const location = res[i];
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(`<div style="display:none">${location._id}</div><div>Enkazın adresi: ${location.address}</div> <div>Tahmini depremzede sayısı: ${location.total_victims}</div> <div>Doğrulanma sayısı: ${location.confirmations}<div/> <button class="confirm-button">Bu konumu doğrula</button>`)
        if (location.total_victims > 0 && location.total_victims <= 5) {
          L.circle([location.latitude, location.longitude], {
            color: 'yellow',
            fillColor: 'yellow',
            fillOpacity: 0.8,
            radius: 2000
          }).addTo(map);
        } else if (location.total_victims > 5 && location.total_victims <= 10) {
          L.circle([location.latitude, location.longitude], {
            color: 'orange',
            fillColor: 'orange',
            fillOpacity: 0.8,
            radius: 2000
          }).addTo(map);
        } else if (location.total_victims > 10) {
          L.circle([location.latitude, location.longitude], {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.8,
            radius: 2000
          }).addTo(map);
        }

      }

    }
  };
  xhr.send();

}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude.value = parseInt(position.coords.latitude * 100) / 100.0
  longitude.value = parseInt(position.coords.longitude * 100) / 100.0
}

window.onload = () => {

  initMap();

  const addButton = document.getElementById("add-button");
  const addLocationContent = document.getElementById("add-location-content");
  const closeButton = document.getElementById("close-window-button");
  const coordinatesButton = document.getElementById("get-coordinates-button");

  const latitude = document.getElementById("latitude");
  const longitude = document.getElementById("longitude");

  addButton.addEventListener("click", () => {
    addLocationContent.style.display = "flex"
  })

  closeButton.addEventListener("click", () => {
    addLocationContent.style.display = "none"
  })

  coordinatesButton.addEventListener("click", () => {
    getLocation();
  })

  document.addEventListener("click", (event) => {

    if (event.target.classList.contains("confirm-button")) {

      const id = event.target.parentNode.parentNode.parentNode.children[0].innerHTML
      if (getLocalBoolean(`location_${id}`)) {
        alert("Bu konumu çoktan doğruladınız.");
        return;
      } else {

        var xhr = new XMLHttpRequest();
        var res = [];
        xhr.open("POST", "/confirm_location", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            setLocalBoolean(`location_${id}`, true)
            alert("Konum doğrulandı");
            window.location.reload();
          }
        }
        const data = {
          _id: id
        }
        xhr.send(JSON.stringify(data));
      }
    }
  })
}

function setLocalBoolean(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Retrieve the value from local storage
function getLocalBoolean(key) {
  return JSON.parse(localStorage.getItem(key));
}

