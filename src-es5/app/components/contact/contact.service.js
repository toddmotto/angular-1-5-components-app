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

angular
  .module('components.contact')
  .factory('ContactService', ContactService);
