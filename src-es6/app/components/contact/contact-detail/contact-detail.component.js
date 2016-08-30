import angular from 'angular'

let contactDetail = {
  bindings: {
    contact: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&'
  },
  templateUrl: './contact-detail.html',
  controller: 'ContactDetailController'
};

angular
  .module('components.contact')
  .component('contactDetail', contactDetail);
