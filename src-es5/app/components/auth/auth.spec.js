describe('Auth', function () {
  beforeEach(module('components.auth'));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', { url: '/' });
  }));

  describe('Routes', function () {
    var $state, AuthService, $location, $rootScope, $q;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      AuthService = $injector.get('AuthService');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
    }));

    it('should redirect to auth.login state', function() {
      spyOn(AuthService, 'requireAuthentication').and.callFake(
        function () {
          return $q.reject('Not authenticated!');
        }
      );

      goTo('/app');

      expect($state.current.name).toEqual('auth.login')
    });

    it('should redirect to app state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/auth');

      expect($state.current.name).toEqual('app')
    });
  });

  describe('AuthService', function () {
    var AuthService, $firebaseAuth, $rootScope;

    beforeEach(inject(function ($injector) {
      AuthService = $injector.get('AuthService');
      $firebaseAuth = $injector.get('$firebaseAuth')();
      $rootScope = $injector.get('$rootScope');
    }));

    it('should return undefined for initial user', function () {
      expect(AuthService.getUser()).toBeUndefined();
    });

    it('should login and store the authenticated user', function () {
      var user = { email: 'test@test.com', password: 'insecure' },
        response = { $id: 1 },
        promise = AuthService.login(user);

      promise.then(function (result) {
        expect(result).toEqual(response);
        expect(AuthService.isAuthenticated()).toBe(true);
        expect(AuthService.getUser()).toEqual(response);
      });

      $rootScope.$digest();
    });

    it('should properly store auth data when registering a user', function () {
      var user = { email: 'test@test.com', password: 'insecure' },
        response = { $id: 1 },
        promise = AuthService.register(user);

      promise.then(function (result) {
        expect(result).toEqual(response);
        expect(AuthService.isAuthenticated()).toBe(true);
        expect(AuthService.getUser()).toEqual(response);
      });

      $rootScope.$digest();
    });

    it('should clear auth data when logout is called', function () {
      var promise = AuthService.logout();

      promise.then(function (result) {
        expect(AuthService.isAuthenticated()).toBe(false);
        expect(AuthService.getUser()).toBeUndefined();
      });

      $rootScope.$digest();
    });

    it('should should return correct auth data on getUser', function () {
      var user = { email: 'test@test.com', password: 'insecure' },
        response = { $id: 1 },
        promise = AuthService.login(user);

      promise.then(function (result) {
        expect(AuthService.getUser()).toEqual(response);
      });

      $rootScope.$digest();

      promise = AuthService.logout();

      promise.then(function (result) {
        expect(AuthService.getUser()).toBeUndefined();
      });

      $rootScope.$digest();
    });

    it('should should return correct response on requireAuthentication', function () {
      var response = { $id: 1 },
        promise = AuthService.requireAuthentication();

      promise.then(function (result) {
        expect(result).toEqual(response);
      });

      $rootScope.$digest();
    });

  });
});
