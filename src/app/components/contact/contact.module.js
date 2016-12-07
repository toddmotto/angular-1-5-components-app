import { ContactService } from './contact.service';
import { lengthCheck } from './length-check/length-check.directive';
import { contacts } from './contacts/contacts.module';
import { contactSingle } from './contact/contact.module';
import { contactNew } from './contact-new/contact-new.module';
import { contactDetail } from './contact-detail/contact-detail.module';
import { contactEdit } from './contact-edit/contact-edit.module';
import { contactTag } from './contact-tag/contact-tag.module';

export const contact = angular
  .module('components.contact', [
    contacts,
    contactSingle,
    contactNew,
    contactDetail,
    contactEdit,
    contactTag,
  ])
  .service('ContactService', ContactService)
  .directive('lengthCheck', lengthCheck)
  .name;
