function prayerApi(latitude, longitude) {
  // fetch('http://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=11')
  fetch('http://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=99&methodSettings=20,null,18&tune=1,1,-2,2,2,2,0,1,0')
    .then(response => response.json())
    .then(function (response) {
      let date = new Date();
      let today = date.getDate() - 1;
      let data = response.data[today].timings;

      let app = document.getElementById('app');
      let table = document.createElement('table');
      let tableBody = document.createElement('tbody');

      for (i in data) {
        let row = tableBody.insertRow();
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i];
        tableBody.appendChild(row);
      }
      table.appendChild(tableBody);
      app.appendChild(table);
    });
}

function success(position) {
  //position param accessing latitude & longitude
  prayerApi(position.coords.latitude, position.coords.longitude);
}

function error() {
  alert("Location access denied. Default time region Jakarta.");
  prayerApi('-6.200000', '106.816666');
}

function userLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported. Try different browser.");
  } else {
    //callbacks success or error
    //accessing geolocation
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function index() {
  let app = document.getElementById("app");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  h3.innerHTML = "Prayer Times | Waktu Sholat";
  p.innerHTML = "2 Minutes of Ihtiyath time (safety period) added to the prayer table";

  app.appendChild(h3);
  app.appendChild(p);
  userLocation();
}

index();
