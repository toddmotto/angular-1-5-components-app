describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.contact', ($provide) => {
      $provide.value('ContactService', {
        getContactsList() {
          return {
            $loaded: angular.noop,
          };
        },
      });
    });
    angular.mock.module('components.auth');
    angular.mock.module(($stateProvider) => {
      $stateProvider.state('app', {
        redirectTo: 'contacts',
        url: '/app',
        data: {
          requiredAuth: true,
        },
      });
    });
  });

  describe('Routes', () => {
    let $state;
    let $location;
    let $rootScope;
    let AuthService;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(($injector) => {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    it('should go to the contact state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
      goTo('/app/contacts?friends');
      expect($state.current.name).toEqual('contacts')
    });
  });

  describe('ContactController', () => {
    let $componentController;
    let controller;
    let $filter;
    let $state;
    const mockFilter = { filter: 'friends'};
    const mockContacts = [{
      name: 'John Doe',
      tag: 'friends',
    }, {
      name: 'Jane Smith',
      tag: 'family',
    }];

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      $filter = $injector.get('$filter');
      $state = $injector.get('$state');
      controller = $componentController('contacts',
        { $scope: {}, $filter: $filter, $state: $state },
        { filter: mockFilter, contacts: mockContacts }
      );
    }));

    it('should filter contacts', () => {
      expect(controller.filteredContacts).toEqual([{
        name: 'John Doe',
        tag: 'friends',
      }]);
    });

    it('should route on goToContact call', () => {
      const event = { contactId: 1 };

      spyOn($state, 'go');
      controller.goToContact(event);
      expect($state.go).toHaveBeenCalledWith('contact', { id: event.contactId });
    });
  });
});
