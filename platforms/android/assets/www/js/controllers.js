angular.module('starter.controllers', ['google.places'])

  .controller('AppCtrl', function ($scope,$state,$http,$ionicPopup, $ionicModal, $timeout) {

    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
   
    // $scope.doLogin = function () {
    //   console.log('Doing login', $scope.loginData);
    //   $timeout(function () {
    //     $scope.closeLogin();
    //   }, 1000);
    // };

    // $scope.login = function () {
    //   LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
    //     $state.go('tab.dash');
    //   }).error(function (data) {
    //     var alertPopup = $ionicPopup.alert({
    //       title: 'Login failed!',
    //       template: 'Please check your credentials!'
    //     });
    //   });
    // };

    /*LOGIN START*/
    $scope.doLogin = function () {
      // alert("login");

      console.log(JSON.stringify($scope.loginData));
      // var data = {
      //   email: $scope.email,
      //   password: $scope.password
      // };
     
      var req = {
        method: 'POST',
        url: 'http://172.16.27.9:8090/api/login',
        headers: {
          'Content-Type': "application/json"
        },
        data: JSON.stringify($scope.loginData)
      }
      $http(req).success(function (data, status, headers, config) {
        console.log("Reponse Msg:: " + JSON.stringify(data));
        console.log("status = " + status);
        if (status == 200) {
          //$scope.getdata = response.data.acknowledgement;
          $state.go('trip');
          $scope.modal.hide();
        } else {          
          $state.go('app.browse');
        }
      }).error(function (data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
        console.error('Repos error', status, data);
        $state.go('app.browse');

      });
    };


  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams, $state, $http, $rootScope, $location, $ionicScrollDelegate) {


    $scope.booking = function () {
      $state.go('trip');
    };

    $scope.bookLock = function (from, to) {
      console.log($scope.from);
      console.log($scope.to);

      alert("Successfully Booked");
      // $state.go('trip');
    };



  });
