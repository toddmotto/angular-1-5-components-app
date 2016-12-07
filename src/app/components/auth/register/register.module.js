import uiRouter from 'angular-ui-router';
import { registerComponent } from './register.component';

export const register = angular
  .module('components.auth.register', [
    uiRouter,
  ])
  .component('register', registerComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('auth.register', {
        url: '/register',
        component: 'register',
      });
  })
  .name;
