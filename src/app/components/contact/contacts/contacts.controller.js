function ContactsController($filter, $state) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter);
  };

  ctrl.goToContact = function (event) {
    $state.go('contact', {
      id: event.contactId
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController);
