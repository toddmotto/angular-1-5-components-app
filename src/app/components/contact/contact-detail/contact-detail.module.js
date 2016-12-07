import { contactDetailComponent } from './contact-detail.component';
import './contact-detail.scss';

export const contactDetail = angular
  .module('components.contact.contact-detail', [])
  .component('contactDetail', contactDetailComponent)
  .name;
