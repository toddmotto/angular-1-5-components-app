import { contactTagComponent } from './contact-tag.component';

export const contactTag = angular
  .module('components.contact.contact-tag', [])
  .component('contactTag', contactTagComponent)
  .name;
