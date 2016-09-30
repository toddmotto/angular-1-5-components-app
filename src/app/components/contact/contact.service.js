function ContactService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  var ref = $firebaseRef.contacts;
  var uid = AuthService.getUser().uid;
  return {
    createNewContact: function (contact) {
      return $firebaseArray(ref.child(uid)).$add(contact);
    },
    getContactById: function (id) {
      return $firebaseObject(ref.child(uid).child(id));
    },
    getContactList: function () {
      return $firebaseArray(ref.child(uid));
    },
    updateContact: function (contact) {
      return contact.$save();
    },
    deleteContact: function (contact) {
      return contact.$remove();
    }
  };
}

/**
 * @ngdoc service
 * @name ContactService
 * @module components.contact
 *
 * @description Provides HTTP methods for our firebase connection.
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
  .factory('ContactService', ContactService);
