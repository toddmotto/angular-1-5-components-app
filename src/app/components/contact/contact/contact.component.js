var contact = {
  bindings: {
    contact: '<',
    onSelect: '&'
  },
  templateUrl: './contact.html',
  controller: 'ContactController'
};

angular
  .module('components.contact')
  .component('contact', contact);
