import { contactComponent } from './contact.component';
import './contact.scss';

export const contactSingle = angular
  .module('components.contact.contact', [])
  .component('contact', contactComponent)
  .name;
