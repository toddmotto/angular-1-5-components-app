import angular from 'angular'

let app = {
  templateUrl: './app.html',
  controller: 'AppController'
};

config.$inject = ['$stateProvider']
function config($stateProvider) {
  $stateProvider
    .state('app', {
      redirectTo: 'contacts',
      url: '/app',
      data: {
        requiredAuth: true
      },
      component: 'app'
    })
}
angular
  .module('common')
  .component('app', app)
  .config(config);
