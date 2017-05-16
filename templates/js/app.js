// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'LoginCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'LoginCtrl'
      }).state('chat', {
        url: '/chat',
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
    });


    $urlRouterProvider.otherwise("/");

  })

  .controller('LoginCtrl', function($scope, $state, $location) {

    $scope.data = {};

    $scope.signupEmail = function(){

      firebase.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password).catch(function(error) {
        // TODO: Handle error
        console.log(error.code);
        console.log(error.message);
      });

      $location.path('/chat');

    };

    $scope.loginEmail = function(){

      console.log($scope.data.email);
      console.log($scope.data.password);

      firebase.auth().signInWithEmailAndPassword($scope.data.email, $scope.data.password).catch(function(error) {
        // TODO: Handle error
      });

      $location.path('/chat');
    };

  })

  .controller('ChatCtrl', function ($scope, $state, $timeout) {

      $scope.messages = [];

      var chatsRef = firebase.database().ref("/messages/");
      chatsRef.on('child_added', function (message) {
        $timeout(function () {
          $scope.messages.push(message.val());
        });
      });


  })

  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  });


