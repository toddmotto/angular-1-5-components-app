function ContactsController($filter, $state) {
  var ctrl = this;
  var contacts = ctrl.contacts;

  ctrl.filteredContacts = $filter('contactsFilter')(contacts, ctrl.filter);

  ctrl.goToContact = function (event) {
    $state.go('contact', {
      id: event.contactId
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController);
