import angular from 'angular'

let appNav = {
  bindings: {
    user: '<',
    onLogout: '&'
  },
  templateUrl: './app-nav.html'
};

angular
  .module('common')
  .component('appNav', appNav);
