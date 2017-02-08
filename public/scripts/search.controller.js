angular.module("myApp").controller("SearchController", [
  "GiphyService",
  "FavoritesService",
  function(GiphyService, FavoritesService) {
    console.log("loaded gif controller");

    var vm = this;

    vm.FavoritesService = FavoritesService;
    vm.results = [];

    updateFavoriteCount();

    function updateFavoriteCount() {
      FavoritesService.getFavorites().then(function(favorites){
        FavoritesService.favoriteCount = favorites.length;
      })
    }

    this.random = function() {
      GiphyService.randomGif().then(function(gif) {
        console.log('gif', gif);
        vm.results = [];
        vm.results.push({ url: gif.data.image_url });
      });
    };

    this.search = function() {
        GiphyService.searchGif(vm.q).then(function(gifs) {
          console.log('gifs', gifs);
        vm.results = gifs.data.map(function(gif) {
          return { url: gif.images.fixed_height.url };
        });

        console.log(vm.results);
      });
    };

    this.createFavorite = function(favorite) {
      FavoritesService.saveFavorite(favorite).then(function(){
        console.log('Saved a real favorite');
        updateFavoriteCount();
      })
    }
  }
]);
