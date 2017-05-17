var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

function extractTop10Tracks(tracks) {
  return tracks.sort(function(a,b){
    a.popularity - b.popularity
  });
}

function extractPopularity(tracks) {
  return tracks.map(function(track){return track.popularity});
}

function extractNames(tracks) {
  return tracks.map(function(track){return track.name});
}

function chartData(labels, inputData) {
  var ctx = $("#spotify-chart");
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: "Popularity",
        data: inputData
      }]
    }
  });
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url, 
    success: callback
  });
}

function success(parsedJSON) {
  var tracks = parsedJSON.tracks;
  topTracks = extractTop10Tracks(tracks);
  var tracksPopularity = extractPopularity(topTracks);
  var tracksNames = extractNames(topTracks);
  var chart = chartData(tracksNames, tracksPopularity);
}
