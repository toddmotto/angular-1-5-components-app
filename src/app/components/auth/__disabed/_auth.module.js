import angular     from 'angular'
import uiRouter    from 'angular-ui-router'
import firebase    from 'firebase'
import angularFire from 'angularfire'
import AuthService from './auth.service'

configFirebase.$inject = ['$firebaseRefProvider'];
function configFirebase($firebaseRefProvider) {

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
}

AuthInit.$inject = ['$transitions','$state','AuthService']
function AuthInit($transitions, $state, AuthService) {
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
}

angular
  .module('auth', [
    // uiRouter,
    // angularFire
  ]);
  // .config(configFirebase)
  // .run(AuthInit);
