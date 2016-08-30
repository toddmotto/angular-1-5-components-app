describe('Auth', function () {
  beforeEach(module('components.auth'));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', { url: '/' });
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

    it('should go to auth.register state', function() {
      spyOn(AuthService, 'requireAuthentication').and.callFake(
        function () {
          return $q.when('is authenticated');
        }
      );
      goTo('/auth/register');
      expect($state.current.name).toEqual('auth.register')
    });

    it('should redirect to app state', function() {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
      goTo('/auth/register');
      expect($state.current.name).toEqual('app')
    });
  });

  describe('RegisterController', function () {
    var $componentController,
      controller,
      AuthService,
      $state,
      $rootScope,
      $q;

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('register',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );
    }));

    it('should initialize with correct properties', function () {
      controller.$onInit();

      expect(controller.error).toBeNull();
      expect(controller.user.email).toEqual('');
      expect(controller.user.password).toEqual('');
    });

    it('should redirect on successful registration ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } };

      spyOn(AuthService, 'register').and.callFake(function() {
        return $q.when({$id: 1});
      });

      spyOn($state, 'go');

      var promise = controller.createUser(mockEvent);

      promise.then(function(result){
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect($state.go).toHaveBeenCalledWith('app');
      });

      $rootScope.$digest();
    });

    it('should set error on failed login ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } },
        mockMessage = 'Oh bollocks!';

      spyOn(AuthService, 'register').and.callFake(function() {
        return $q.reject({ message: mockMessage});
      });

      spyOn($state, 'go');

      var promise = controller.createUser({});

      promise.then(function(result){
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect(controller.error).toEqual(mockMessage);
        expect($state.go).not.toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});