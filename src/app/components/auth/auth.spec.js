describe('Auth', () => {
  beforeEach(() => {
    angular.mock.module('components.auth');
    angular.mock.module(($stateProvider) => {
      $stateProvider.state('app', { url: '/' });
    });
  })

  describe('Routes', function () {
    let $state;
    let AuthService;
    let $location;
    let $rootScope;
    let $q;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(($injector) => {
      $state = $injector.get('$state');
      AuthService = $injector.get('AuthService');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
    }));

    it('should redirect to auth.login state', () => {
      spyOn(AuthService, 'requireAuthentication').and.callFake(() => $q.reject('Not authenticated!'));
      goTo('/app');
      expect($state.current.name).toEqual('auth.login')
    });

    it('should redirect to app state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
      goTo('/auth');
      expect($state.current.name).toEqual('app')
    });
  });

  describe('AuthService', () => {
    let AuthService;
    let $firebaseAuth;
    let $rootScope;

    beforeEach(inject(($injector) => {
      AuthService = $injector.get('AuthService');
      $firebaseAuth = $injector.get('$firebaseAuth')();
      $rootScope = $injector.get('$rootScope');
    }));

    it('should return undefined for initial user', () => {
      expect(AuthService.getUser()).toBeUndefined();
    });

    it('should login and store the authenticated user', () => {
      const user = { email: 'test@test.com', password: 'insecure' };
      const response = { $id: 1 };
      const promise = AuthService.login(user);

      promise.then((result) => {
        expect(result).toEqual(response);
        expect(AuthService.isAuthenticated()).toBe(true);
        expect(AuthService.getUser()).toEqual(response);
      });

      $rootScope.$digest();
    });

    it('should properly store auth data when registering a user', () => {
      const user = { email: 'test@test.com', password: 'insecure' };
      const response = { $id: 1 };
      const promise = AuthService.register(user);

      promise.then((result) => {
        expect(result).toEqual(response);
        expect(AuthService.isAuthenticated()).toBe(true);
        expect(AuthService.getUser()).toEqual(response);
      });

      $rootScope.$digest();
    });

    it('should clear auth data when logout is called', () => {
      const promise = AuthService.logout();

      promise.then((result) => {
        expect(AuthService.isAuthenticated()).toBe(false);
        expect(AuthService.getUser()).toBeUndefined();
      });

      $rootScope.$digest();
    });

    it('should should return correct auth data on getUser', () => {
      const user = { email: 'test@test.com', password: 'insecure' };
      const response = { $id: 1 };
      let promise = AuthService.login(user);

      promise.then((result) => {
        expect(AuthService.getUser()).toEqual(response);
      });

      $rootScope.$digest();

      promise = AuthService.logout();

      promise.then((result) => {
        expect(AuthService.getUser()).toBeUndefined();
      });

      $rootScope.$digest();
    });

    it('should should return correct response on requireAuthentication', () => {
      const response = { $id: 1 };
      const promise = AuthService.requireAuthentication();

      promise.then((result) => {
        expect(result).toEqual(response);
      });

      $rootScope.$digest();
    });
  });
});
