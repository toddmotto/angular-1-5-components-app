import angular from 'angular'
import contact from './contact/contact.module.js'
import auth    from './auth/auth.module.js'

angular
  .module('components', [
    'auth',
    'contact'
  ]);
