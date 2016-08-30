import angular from 'angular'
import auth    from './auth/auth.module.js'

angular
  .module('components', [
    // 'components.contact',
    'auth'
  ]);
