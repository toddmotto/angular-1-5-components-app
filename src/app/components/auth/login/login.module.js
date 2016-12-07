import uiRouter from 'angular-ui-router';
import { loginComponent } from './login.component';

export const login = angular
  .module('components.auth.login', [
    uiRouter,
  ])
  .component('login', loginComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>',
      })
      .state('auth.login', {
        url: '/login',
        component: 'login',
      });
    $urlRouterProvider.otherwise('/auth/login');
  })
  .name;
