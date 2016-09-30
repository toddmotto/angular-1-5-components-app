function AppController(AuthService, $state) {
  var ctrl = this;
  ctrl.user = AuthService.getUser();

 /**
  * @ngdoc method
  * @name AppController#logout
  *
  * @description Logout :)
  */
  ctrl.logout = function () {
    AuthService.logout().then(function () {
      $state.go('auth.login');
    });
  };
}

/**
 * @ngdoc type
 * @module common
 * @name AppController
 *
 * @description
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
  .module('common')
  .controller('AppController', AppController);
