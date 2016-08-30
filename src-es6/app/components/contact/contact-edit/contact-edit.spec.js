describe('Contact', function () {
  beforeEach(module('components.auth'));

  beforeEach(module('components.contact', function ($provide) {
    $provide.value('ContactService', {
      updateContact: angular.noop,
      deleteContact: angular.noop,
      getContactById: function() {
        return {
          $loaded: angular.noop
        }
      }
    });

    $provide.value('cfpLoadingBar', {
      start: angular.noop,
      complete: angular.noop
    })

    $provide.value('$window', {
      confirm: function() { return true; }
    })
  }));

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

      goTo('/app/contact/1');

      expect($state.current.name).toEqual('contact');
    });
  });

  describe('ContactDetailController', function () {
    var $componentController,
      controller,
      $state,
      ContactService,
      cfpLoadingBar,
      $rootScope,
      $q,
      mockContact = { $id: 1 };

    beforeEach(inject(function ($injector) {
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

    it('should update contact', function () {
      var event = { contact: { $id: 1 }};
      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(ContactService, 'updateContact').and.callFake(
        function () {
          return $q.when({})
        }
      );

      var promise = controller.updateContact(event);

      expect(cfpLoadingBar.start).toHaveBeenCalled();

      promise.then(function () {
        expect(ContactService.updateContact).toHaveBeenCalled();
        expect(cfpLoadingBar.complete).toHaveBeenCalled();
      });

      $rootScope.$digest();
    });

    it('should delete contact', function () {
      var event = { contact: { $id: 1, name: 'John Smith' }};
      spyOn($state, 'go');

      spyOn(ContactService, 'deleteContact').and.callFake(
        function () {
          return $q.when({})
        }
      );

      var promise = controller.deleteContact(event);

      promise.then(function () {
        expect($state.go).toHaveBeenCalledWith('contacts');
      });

      $rootScope.$digest();
    });
  });
});