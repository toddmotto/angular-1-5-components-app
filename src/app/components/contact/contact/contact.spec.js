describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.contact');
  });

  describe('Controller', () => {
    let $componentController;
    let controller;
    const mockContact = { $id: 1 };
    const mockSelect = angular.noop;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contact',
        { $scope: {} },
        { contact: mockContact, onSelect: mockSelect }
      );
    }));

    it('should bind to the correct contact', () => {
      expect(controller.contact.$id).toEqual(mockContact.$id);
    });

    it('should call onSelect with the correct payload', () => {
      const payload = { $event: { contactId: mockContact.$id } };

      spyOn(controller, 'onSelect');
      controller.selectContact();
      expect(controller.onSelect).toHaveBeenCalledWith(payload);
    });
  });
});
