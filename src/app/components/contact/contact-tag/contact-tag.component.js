var contactTag = {
  bindings: {
    tag: '<',
    onChange: '&'
  },
  templateUrl: './contact-tag.html',
  controller: 'ContactTagController'
};

angular
  .module('components.contact')
  .component('contactTag', contactTag);
