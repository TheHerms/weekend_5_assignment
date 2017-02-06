var app = angular.module('myApp', []);

app.controller('GifController', function(GifGetter){
  console.log('connected?');

  var gif = this;

  GifGetter.randomGif().then(function(res){
    console.log('from the controller', res);

    gif.randomGifUrl = res.data.image_url;

  });
  // console.log('test:', GifGetter.randomGif());
  gif.searchGif = function(searchQuery){
    GifGetter.searchGif(searchQuery).then(function(res){
      //store array of gifs in searchGifUrl
      gif.searchGifUrl = res.data;
    });
  };
});
// var app = angular.module('myApp', ['ngRoute']);
//
// app.config(function($routeProvider, $locationProvider){
//  $routeProvider.when('/main', {
//    templateUrl: 'views/pages/main.html',
//    controller: 'GifController as gif'
//  }).when('/favorites', {
//    templateUrl: 'views/pages/favorites.html',
//    controller: 'GifController as gif'
//  });
//  $locationProvider.html5Mode(true);
// });
