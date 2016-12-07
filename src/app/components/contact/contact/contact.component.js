import template from './contact.html';

export const contactComponent = {
  bindings: {
    contact: '<',
    onSelect: '&',
  },
  template,
  controller: class ContactComponent {
    constructor() {
      'ngInject';
    }
    selectContact() {
      this.onSelect({
        $event: {
          contactId: this.contact.$id,
        },
      });
    }
  },
};
