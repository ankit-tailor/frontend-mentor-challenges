// constants

const TOKEN =
  "pk.eyJ1IjoiYW5raXQtdGFpbG9yIiwiYSI6ImNrejJ6MnR0MTAxcjYycXBnZXAxaWpzZ2kifQ.EwbzczGrCi5wpRbKwlshWA";
const BASE_API =
  "https://api.ipgeolocation.io/ipgeo?apiKey=d76bcfc29f9a4e64984837dddb614aba&ip=";
const SUCCESS = "success";
var map;

// all the elements from the DOM

const ipAddressInput = document.querySelector(".ip-input");
const searchForm = document.querySelector(".search-form");
const ip = document.querySelector(".ip");
const ipLocation = document.querySelector(".ip-location");
const ipTimezone = document.querySelector(".ip-timezone");
const ipIsp = document.querySelector(".ip-isp");

/********************    Helper Methods     ************************/

/**
 *
 * @param {*} mapToken Token for map box
 */
const drawMap = (mapToken, latitude, longitude, zoomLevel) => {
  mapboxgl.accessToken = mapToken;
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-74.5, 40],
    zoom: 9,
  });
};

/**
 *
 * @param {*} ipAddress IP adress input by user
 */

const fetchIPDetails = async (ipAddress) => {
  const url = BASE_API + ipAddress;
  const response = await fetch(url);
  const data = await response.json();

  //   if (data.status === SUCCESS) {
  if (!data.message) {
    const {
      longitude,
      latitude,
      time_zone: { current_time },
      isp,
    } = data;
    // drawMap(TOKEN, latitude, longitude, 15);
    console.log(latitude, longitude, current_time, isp);
    const locationArr = [longitude, latitude];
    map.flyTo({
      center: locationArr,
      essential: true,
    });
    ip.innerHTML = ipAddress;
    ipLocation.innerHTML = `${data.district} <br /> ${data.state_prov}`;
    ipTimezone.innerHTML = current_time;
    ipIsp.innerHTML = isp;
  } else {
    alert("data not found");
  }
  //   } else {
  //     console.log(data, "FAILED to get ip details");
  //   }
};

/***************  Actual logic happens here   **************************/

drawMap(TOKEN, 30.94785, 76.80675, 8);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const ipAddress = ipAddressInput.value;
  fetchIPDetails(ipAddress);
  ipAddress.value = "";
});
