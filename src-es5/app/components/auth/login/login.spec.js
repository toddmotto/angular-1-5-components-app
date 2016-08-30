describe('Auth', function () {
  beforeEach(module('components.auth'));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', { url: '/' });
  }));

  describe('Routes', function () {
    var $state, $location, $rootScope;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should redirect to auth.login state', function() {
      goTo('/auth');
      expect($state.current.name).toEqual('auth.login')
    });

    it('should go to auth.login state', function() {
      goTo('/login');
      expect($state.current.name).toEqual('auth.login')
    });
  });

  describe('LoginController', function () {
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

      controller = $componentController('login',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );
    }));

    it('should initialize with correct properties', function () {
      controller.$onInit();

      expect(controller.error).toBeNull();
      expect(controller.user.email).toEqual('');
      expect(controller.user.password).toEqual('');
    });

    it('should redirect on successful login ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } };

      spyOn(AuthService, 'login').and.callFake(function() {
        return $q.when({$id: 1});
      });

      spyOn($state, 'go');

      var promise = controller.loginUser(mockEvent);

      promise.then(function(result){
        expect(AuthService.login).toHaveBeenCalledWith(mockEvent.user);
        expect($state.go).toHaveBeenCalledWith('app');
      });

      $rootScope.$digest();
    });

    it('should set error on failed login ', function () {
      var mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } },
        mockMessage = 'wrong username or password';

      spyOn(AuthService, 'login').and.callFake(function() {
        return $q.reject({ message: mockMessage});
      });

      spyOn($state, 'go');

      var promise = controller.loginUser({});

      promise.then(function(result){
        expect(AuthService.login).toHaveBeenCalledWith(mockEvent.user);
        expect(controller.error).toEqual(mockMessage);
        expect($state.go).not.toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});