function initialize() {
  var myLatlng = new google.maps.LatLng(59.3354665,18.0627184);
  var mapOptions = {
    zoom: 14,
    center: myLatlng,
    disableDefaultUI: true,
    styles: [{
      stylers: [
      {hue: '#ffffff'},
      {saturation: -100}
      ]
    }
    ]
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Reform Studios'
  });
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=&AIzaSyCjd80Yx48YZ5QZcmD5iX76eHrAA0F7PfU&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
