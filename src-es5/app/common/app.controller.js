function AppController(AuthService, $state) {
  var ctrl = this;
  ctrl.user = AuthService.getUser();
  ctrl.logout = function () {
    AuthService.logout().then(function () {
      $state.go('auth.login');
    });
  };
}

angular
  .module('common')
  .controller('AppController', AppController);
