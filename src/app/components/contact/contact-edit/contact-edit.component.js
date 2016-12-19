import templateUrl from './contact-edit.html';

export const contactEditComponent = {
  bindings: {
    contact: '<',
  },
  templateUrl,
  controller: class ContactEditComponent {
    constructor(ContactService, cfpLoadingBar, $window, $state) {
      'ngInject';

      this.contactService = ContactService;
      this.cfpLoadingBar = cfpLoadingBar;
      this.$window = $window;
      this.$state = $state;
    }
    deleteContact(event) {
      const message = `Delete ${event.contact.name} from contacts?`;
      if (this.$window.confirm(message)) {
        return this.contactService
          .deleteContact(event.contact)
          .then(() => {
            this.$state.go('contacts');
          });
      }
    }
    updateContact(event) {
      this.cfpLoadingBar.start();
      return this.contactService
        .updateContact(event.contact)
        .then(() => {
          this.cfpLoadingBar.complete();
        }, () => {
          this.cfpLoadingBar.complete();
        });
    }
  },
};
