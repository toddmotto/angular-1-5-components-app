describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.auth');
    angular.mock.module('components.contact', ($provide) => {
      $provide.value('ContactService', {
        updateContact: angular.noop,
        deleteContact: angular.noop,
        getContactById() {
          return {
            $loaded: angular.noop,
          };
        },
      });
      $provide.value('cfpLoadingBar', {
        start: angular.noop,
        complete: angular.noop,
      });
      $provide.value('$window', {
        confirm() { return true; },
      });
    });
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
      goTo('/app/contact/1');
      expect($state.current.name).toEqual('contact');
    });
  });

  describe('ContactDetailController', () => {
    let $componentController;
    let controller;
    let $state;
    let $window;
    let ContactService;
    let cfpLoadingBar;
    let $rootScope;
    let $q;
    const mockContact = { $id: 1 };

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      ContactService = $injector.get('ContactService');
      cfpLoadingBar = $injector.get('cfpLoadingBar');
      $window = $injector.get('$window');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('contactEdit',
        { $scope: {}, $state: $state, ContactService: ContactService, cfpLoadingBar: cfpLoadingBar },
        { contact: mockContact }
      );
    }));

    it('should update contact', () => {
      const event = { contact: { $id: 1 }};
      let promise;

      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(ContactService, 'updateContact').and.callFake(() => $q.when({}));

      promise = controller.updateContact(event);

      expect(cfpLoadingBar.start).toHaveBeenCalled();

      promise.then(() => {
        expect(ContactService.updateContact).toHaveBeenCalled();
        expect(cfpLoadingBar.complete).toHaveBeenCalled();
      });

      $rootScope.$digest();
    });

    it('should delete contact', () => {
      const event = { contact: { $id: 1, name: 'John Smith' }};
      let promise;

      spyOn($state, 'go');
      spyOn(ContactService, 'deleteContact').and.callFake(() => $q.when({}));

      promise = controller.deleteContact(event);

      promise.then(() => {
        expect($state.go).toHaveBeenCalledWith('contacts');
      });

      $rootScope.$digest();
    });
  });
});
