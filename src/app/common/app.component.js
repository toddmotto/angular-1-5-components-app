var app = {
  templateUrl: './app.html',
  controller: 'AppController'
};

/**
 * @ngdoc directive
 * @name app
 * @module common
 *
 * @description
 *
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * @usage
 *
 * ### How to use
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 **/
angular
  .module('common')
  .component('app', app)
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        redirectTo: 'contacts',
        url: '/app',
        data: {
          requiredAuth: true
        },
        component: 'app'
      })
  });
