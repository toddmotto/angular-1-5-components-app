function ContactEditController($state, ContactService, cfpLoadingBar, $window) {
  var ctrl = this;
  /**
   * @ngdoc method
   * @name ContactEditController#updateContact
   *
   * @param {event} event Receive the emitted event
   * Updates the contact information
   *
   * @return {method} ContactService returns the updateContact method and a promise
   */
  ctrl.updateContact = function (event) {
    cfpLoadingBar.start();
    return ContactService
      .updateContact(event.contact)
      .then(cfpLoadingBar.complete, cfpLoadingBar.complete);
  };
  /**
   * @ngdoc method
   * @name ContactEditController#deleteContact
   *
   * @param {event} event Delete the contact
   *
   * @return {method} ContactService returns the deleteContact method and a promise
   */
  ctrl.deleteContact = function (event) {
    var message = 'Delete ' + event.contact.name + ' from contacts?';
    if ($window.confirm(message)) {
      return ContactService
        .deleteContact(event.contact)
        .then(function () {
          $state.go('contacts');
        });
    }
  };
}

/**
 * @ngdoc type
 * @module components.contact
 * @name ContactEditController
 *
 * @description
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
  .module('components.contact')
  .controller('ContactEditController', ContactEditController);
