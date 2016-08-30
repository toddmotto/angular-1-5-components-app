function ContactController() {
  var ctrl = this;
  ctrl.selectContact = function () {
    ctrl.onSelect({
      $event: {
        contactId: ctrl.contact.$id
      }
    });
  };
}

angular
  .module('components.contact')
  .controller('ContactController', ContactController);
