function AuthService($firebaseAuth) {
  var auth = $firebaseAuth();
  var authData = null;
  function storeAuthData(response) {
    authData = response;
    return authData;
  }
  function onSignIn(user) {
    authData = user;
    return auth.$requireSignIn();
  }
  function clearAuthData() {
    authData = null;
  }
  this.login = function (user) {
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };
  this.register = function (user) {
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };
  this.logout = function () {
    return auth
      .$signOut()
      .then(clearAuthData);
  };
  this.requireAuthentication = function () {
    return auth
      .$waitForSignIn().then(onSignIn);
  };
  this.isAuthenticated = function () {
    return !!authData;
  };
  this.getUser = function () {
    if (authData) {
      return authData;
    }
  };
}

/**
 * @ngdoc service
 * @name AuthService
 * @module components.auth
 *
 * @description Provides HTTP methods for our firebase authentification.
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
  .module('components.auth')
  .service('AuthService', AuthService);
