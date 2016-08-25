describe('Contact', function () {
  beforeEach(module('components.contact', function ($provide) {
    $provide.value('cfpLoadingBar', {
      start: angular.noop,
      complete: angular.noop
    })

    $provide.value('ContactService', {
      createNewContact: angular.noop
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

      goTo('/app/new');

      expect($state.current.name).toEqual('new')
    });
  });

  describe('ContactNewController', function () {
    var $componentController,
      controller,
      $state,
      ContactService,
      $rootScope,
      $q;

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      ContactService = $injector.get('ContactService');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('contactNew',
        { $scope: {}, $state: $state, ContactService: ContactService }
      );
    }));

    it('should create a contact', function () {
      var event = { contact: { email: 'test@test.com', password: 'insecure' } };
      spyOn(ContactService, 'createNewContact').and.callFake(
        function () {
          return $q.when({ key: 1})
        }
      );
      spyOn($state, 'go');

      var promise = controller.createNewContact(event);

      promise.then(function () {
        expect(ContactService.createNewContact).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('contact', {id: 1});
      });

      $rootScope.$digest();
    });
  });
});