var login = {
  templateUrl: './login.html',
  controller: 'LoginController'
};

angular
  .module('components.auth')
  .component('login', login)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>'
      })
      .state('auth.login', {
        url: '/login',
        component: 'login'
      });
    $urlRouterProvider.otherwise('/auth/login');
  });
