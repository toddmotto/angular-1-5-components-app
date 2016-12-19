import templateUrl from './contact-new.html';

export const contactNewComponent = {
  templateUrl,
  controller: class ContactNewComponent {
    constructor(ContactService, $state) {
      'ngInject';

      this.contactService = ContactService;
      this.$state = $state;
    }
    $onInit() {
      this.contact = {
        name: '',
        email: '',
        job: '',
        location: '',
        social: {
          facebook: '',
          github: '',
          twitter: '',
          linkedin: '',
        },
        tag: 'none',
      };
    }
    createNewContact(event) {
      return this.contactService
        .createNewContact(event.contact)
        .then((contact) => {
          this.$state.go('contact', {
            id: contact.key,
          });
        });
    }
  },
};
