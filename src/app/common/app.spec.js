describe('App', () => {
  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.mock.module('common.app', ($provide) => {
      $provide.value('AuthService', {
        getUser: angular.noop,
        logout: angular.noop,
      });
    });
    angular.mock.module('components.auth');
    angular.mock.module(($stateProvider) => {
      $stateProvider.state('contacts', { url: 'app/contacts' });
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

    it('should redirect to contacts state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app');

      expect($state.current.name).toEqual('contacts');
    });
  });

  describe('AppComponent', () => {
    let $rootScope;
    let $q;
    let $componentController;
    let controller;
    let AuthService;
    let $state;

    beforeEach(inject(($injector) => {
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
    }));

    it('should get user on instantiated', () => {
      const user = { $id: 1 };
      spyOn(AuthService, 'getUser').and.returnValue(user);

      controller = $componentController('app', { $scope: {}, AuthService, $state });

      expect(AuthService.getUser).toHaveBeenCalled();
      expect(controller.user).toEqual(user);
    });

    it('should go to the login state on logout', () => {
      spyOn(AuthService, 'logout')
        .and.callFake(() => {
          const deferred = $q.defer();
          deferred.resolve();
          return deferred.promise;
        });
      spyOn($state, 'go').and.callThrough();

      controller = $componentController('app', { $scope: {}, AuthService, $state });

      controller.logout();
      $rootScope.$digest();

      expect(AuthService.logout).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('auth.login');
    });
  });
});
