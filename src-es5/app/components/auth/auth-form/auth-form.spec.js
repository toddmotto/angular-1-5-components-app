describe('Auth', function () {
  beforeEach(module('components.auth'));

  describe('AuthFormController', function () {
    var $componentController,
      controller,
      mockUser = { $id: 1 },
      mockSubmit = angular.noop;

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');

      controller = $componentController('authForm',
        { $scope: {} },
        { user: mockUser, button: '', message: '', onSubmit: mockSubmit }
      );
    }));

    it('should call onSelect with the correct payload', function () {
      var payload = { $event: { user: mockUser } };

      spyOn(controller, 'onSubmit');
      controller.submitForm();
      expect(controller.onSubmit).toHaveBeenCalledWith(payload);
    });
  });
});
