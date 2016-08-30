describe('App', function () {
  beforeEach(module('ui.router'));

  beforeEach(module('common', function ($provide) {
    $provide.value('AuthService', {
      getUser: angular.noop,
      logout: angular.noop
    });
  }));

  beforeEach(module('components.auth'));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('contacts', { url: 'app/contacts' });
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

    it('should redirect to contacts state', function () {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app');

      expect($state.current.name).toEqual('contacts');
    });
  });

  describe('AppController', function () {
    var $rootScope, $q, $componentController, controller, AuthService, $state;

    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
    }));

    it('should get user on instantiated', function () {
      var user = { $id: 1 }
      spyOn(AuthService, 'getUser').and.returnValue(user);

      controller = $componentController('app',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );

      expect(AuthService.getUser).toHaveBeenCalled();
      expect(controller.user).toEqual(user);
    });

    it('should go to the login state on logout', function () {
      spyOn(AuthService, 'logout')
        .and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      });
      spyOn($state, 'go').and.callThrough();

      controller = $componentController('app',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );

      controller.logout();
      $rootScope.$digest();

      expect(AuthService.logout).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth.login');
    });
  });

});
