import angular from 'angular'

let authForm = {
  bindings: {
    user: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './auth-form.html',
  controller: 'AuthFormController'
};

angular
  .module('components.auth')
  .component('authForm', authForm);
