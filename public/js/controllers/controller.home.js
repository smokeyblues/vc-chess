angular.module('VCChess')
  .controller('homeController', homeController);

homeController.$inject = ['$scope'];

function homeController($scope) {
  var home = this;

  // home.Auth = Auth;

    home.parallax = function() {
      $('.parallax').parallax()
    }

    home.sideNav = function() {
      $('.button-collapse').sideNav({
        menuWidth     : 200,
        edge          : 'right',
        closeOnClick  : true,
        draggable     : true
      });
    }

    home.hideNav = function() {
      $('.button-collapse').sideNav('hide');
    }
}
