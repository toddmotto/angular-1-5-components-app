describe('Contact', function () {
  beforeEach(module('components.contact'));

  describe('Controller', function () {
    var $componentController,
      controller,
      mockContact = { $id: 1 },
      mockSelect = angular.noop;

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contact',
        { $scope: {} },
        { contact: mockContact, onSelect: mockSelect }
      );
    }));

    it('should bind to the correct contact', function () {
      expect(controller.contact.$id).toEqual(mockContact.$id);
    });

    it('should call onSelect with the correct payload', function () {
      var payload = { $event: { contactId: mockContact.$id } };

      spyOn(controller, 'onSelect');
      controller.selectContact();
      expect(controller.onSelect).toHaveBeenCalledWith(payload);
    });
  });
});