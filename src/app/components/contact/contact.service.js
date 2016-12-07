import firebase from 'firebase';

export class ContactService {
  constructor(AuthService, $firebaseArray, $firebaseObject) {
    'ngInject';

    this.$firebaseArray = $firebaseArray;
    this.$firebaseObject = $firebaseObject;
    this.ref = firebase.database().ref('contacts');
    this.uid = AuthService.getUser().uid;
  }
  createNewContact(contact) {
    return this.$firebaseArray(this.ref.child(this.uid)).$add(contact);
  }
  getContactById(id) {
    return this.$firebaseObject(this.ref.child(this.uid).child(id));
  }
  getContactsList() {
    return this.$firebaseArray(this.ref.child(this.uid));
  }
  updateContact(contact) {
    return contact.$save();
  }
  deleteContact(contact) {
    return contact.$remove();
  }
}
