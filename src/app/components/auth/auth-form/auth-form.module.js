import { formComponent } from './auth-form.component';

export const authForm = angular
  .module('components.auth.auth-form', [])
  .component('authForm', formComponent)
  .name;
