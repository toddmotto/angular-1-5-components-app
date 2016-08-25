var contactEdit = {
  bindings: {
    contact: '<'
  },
  templateUrl: './contact-edit.html',
  controller: 'ContactEditController'
};

angular
  .module('components.contact')
  .component('contactEdit', contactEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact', {
        parent: 'app',
        url: '/contact/:id',
        component: 'contactEdit',
        resolve: {
          contact: function ($transition$, ContactService) {
            var key = $transition$.params().id;
            return ContactService.getContactById(key).$loaded();
          }
        }
      });
  });
