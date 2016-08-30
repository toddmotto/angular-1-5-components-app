 /**
  * Mike Erickson <codedungeon@gmail.com>
  * 2016.08.29 12:25 (mikeerickson)
  * =============================================================================
  */

 
import angular     from 'angular'
import uiRouter    from 'angular-ui-router'
import angularFire from 'angularfire'
import firebase    from 'firebase'

AuthService.$inject = ['$firebaseAuth']
function AuthService($firebaseAuth) {
  console.log('here1');
  debugger;
  var auth = $firebaseAuth();
  var authData = null;
  function storeAuthData(response) {
    console.log('here2');
    authData = response;
    return authData;
  }
  function onSignIn(user) {
    console.log('here3');
    authData = user;
    return auth.$requireSignIn();
  }
  function clearAuthData() {
    authData = null;
  }
  this.login = function (user) {
    console.log('here4');
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };
  this.register = function (user) {
    console.log('here5');
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };
  this.logout = function () {
    console.log('here6');
    return auth
      .$signOut()
      .then(clearAuthData);
  };
  this.requireAuthentication = function () {
    console.log('here7');
    return auth
      .$waitForSignIn().then(onSignIn);
  };
  this.isAuthenticated = function () {
    console.log('here');
    return !!authData;
  };
  this.getUser = function () {
    console.log('here8');
    if (authData) {
      return authData;
    }
  };
}

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

AuthInit.$inject = ['$transitions','$state','AuthService'];
function AuthInit($transitions,$state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        console.log('here');
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          console.log('here');
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      console.log('here');
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
}

angular
  .module('auth', [
    uiRouter,
    angularFire
  ])
  .config(configFirebase)
  .service('AuthService',AuthService)
  .run(AuthInit);
