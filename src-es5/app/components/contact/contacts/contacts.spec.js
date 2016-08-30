describe('Contact', function () {
  beforeEach(module('components.contact', function($provide){
    $provide.value('ContactService', {
      getContactList: function() {
        return {
          $loaded: angular.noop
        }
      }
    });
  }));

  beforeEach(module('components.auth'));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', {
      redirectTo: 'contacts',
      url: '/app',
      data: {
        requiredAuth: true
      }
    });
  }));

  describe('Routes', function () {
    var $state, $location, $rootScope, AuthService;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    it('should go to the contact state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/contacts?friends');

      expect($state.current.name).toEqual('contacts')
    });
  });

  describe('ContactController', function () {
    var $componentController,
      controller,
      $filter,
      $state,
      mockFilter = { filter: 'friends'},
      mockContacts = [
        {
          name: 'John Doe',
          tag: 'friends'
        },
        {
          name: 'Jane Smith',
          tag: 'family'
        }
      ];

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      $filter = $injector.get('$filter');
      $state = $injector.get('$state');
      controller = $componentController('contacts',
        { $scope: {}, $filter: $filter, $state: $state },
        { filter: mockFilter, contacts: mockContacts }
      );
    }));

    it('should filter contacts', function() {
      expect(controller.filteredContacts).toEqual([{
        name: 'John Doe',
        tag: 'friends'
      }]);
    });

    it('should route on goToContact call', function () {
      var event = { contactId: 1 };

      spyOn($state, 'go');
      controller.goToContact(event);
      expect($state.go).toHaveBeenCalledWith('contact', { id: event.contactId });
    });
  });
});
