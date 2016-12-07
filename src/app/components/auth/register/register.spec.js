describe('Auth', () => {
  beforeEach(() => {
    angular.mock.module('components.auth');
    angular.mock.module(($stateProvider) => {
      $stateProvider.state('app', { url: '/' });
    });
  })

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

    it('should go to auth.register state', () => {
      spyOn(AuthService, 'requireAuthentication').and.callFake(() => $q.when('is authenticated'));
      goTo('/auth/register');
      expect($state.current.name).toEqual('auth.register')
    });

    it('should redirect to app state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
      goTo('/auth/register');
      expect($state.current.name).toEqual('app')
    });
  });

  describe('RegisterController', () => {
    let $componentController;
    let controller;
    let AuthService;
    let $state;
    let $rootScope;
    let $q;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('register', {
        $scope: {},
        AuthService: AuthService,
        $state: $state,
      });
    }));

    it('should initialize with correct properties', () => {
      controller.$onInit();

      expect(controller.error).toBeNull();
      expect(controller.user.email).toEqual('');
      expect(controller.user.password).toEqual('');
    });

    it('should redirect on successful registration ', () => {
      const mockUser = { email: 'test@test.com', password: 'insecure' };
      const mockEvent = { $event: { user: mockUser } };
      let promise;

      spyOn(AuthService, 'register').and.callFake(() => $q.when({$id: 1}));
      spyOn($state, 'go');

      promise = controller.createUser(mockEvent);

      promise.then((result) => {
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect($state.go).toHaveBeenCalledWith('app');
      });

      $rootScope.$digest();
    });

    it('should set error on failed login ', () => {
      const mockUser = { email: 'test@test.com', password: 'insecure' };
      const mockEvent = { $event: { user: mockUser } };
      const mockMessage = 'Oh bollocks!';
      let promise;

      spyOn(AuthService, 'register').and.callFake(() => $q.reject({ message: mockMessage}));
      spyOn($state, 'go');

      promise = controller.createUser({});

      promise.then((result) => {
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect(controller.error).toEqual(mockMessage);
        expect($state.go).not.toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});
