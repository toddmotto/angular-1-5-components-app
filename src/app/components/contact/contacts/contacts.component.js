import templateUrl from './contacts.html';

export const contactsComponent = {
  bindings: {
    contacts: '<',
    filter: '<',
  },
  templateUrl,
  controller: class ContactsComponent {
    constructor($state, $filter) {
      'ngInject';

      this.$state = $state;
      this.filteredContacts = $filter('contactsFilter')(this.contacts, this.filter);
    }
    goToContact(event) {
      this.$state.go('contact', {
        id: event.contactId,
      });
    }
  },
};
