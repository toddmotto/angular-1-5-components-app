import { auth } from './auth/auth.module';
import { contact } from './contact/contact.module';

export const components = angular
  .module('components', [
    auth,
    contact,
  ])
  .name;
