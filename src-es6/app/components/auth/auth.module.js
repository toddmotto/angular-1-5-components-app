import angular from 'angular'
// import pkgInfo from '../../../../package.json'
import uirouter from 'angular-ui-router'
import firebase from 'firebase'

angular
  .module('components.auth', [
    uirouter,
    firebase
  ])
  .config(function ($firebaseRefProvider) {

    var config = {
      apiKey: "AIzaSyCsNISt3dFx7dy5AImIIk62jDDd0OLvZK0",
      authDomain: "contacts-manager-e486f.firebaseapp.com",
      databaseURL: "https://contacts-manager-e486f.firebaseio.com",
      storageBucket: "contacts-manager-e486f.appspot.com",
    };

    $firebaseRefProvider
      .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts'
      });

    firebase.initializeApp(config);
  })
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });
