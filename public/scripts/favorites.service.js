angular.module("myApp").service("FavoritesService", [
  "$http",
  function($http) {
    console.log("FavoritesService loaded");

    this.favoriteCount = 0;

    this.saveFavorite = function(favorite) {
      return $http.post("/favorites", favorite).catch(function(err) {
              console.log("Error saving favorite", err);
            });
          };

          this.getFavorites = function() {
            return $http
              .get("/favorites")
              .then(function(response) {
                return response.data;
              })
              .catch(function(err) {
                console.log("Error getting favorites", err);
              });
          };
        }
      ]);
