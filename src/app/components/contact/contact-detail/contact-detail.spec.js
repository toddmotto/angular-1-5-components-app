describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.contact');
  });

  describe('ContactDetailController', () => {
    let $componentController;
    let controller;
    const mockContact = { $id: 1 };
    const mockSave = angular.noop;
    const mockUpdate = angular.noop;
    const mockDelete = angular.noop;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactDetail',
        { $scope: {} },
        { contact: mockContact, onSave: mockSave, onUpdate: mockUpdate, onDelete: mockDelete }
      );
    }));

    it('should bind to the correct contact', () => {
      expect(controller.contact.$id).toEqual(mockContact.$id);
      controller.$onInit();

      expect(controller.isNewContact).toBe(false);
    });

    it('should initialize isNewContact if no $id is present', () => {
      controller = $componentController('contactDetail',
        { $scope: {} },
        { contact: {}, onSave: mockSave, onUpdate: mockUpdate, onDelete: mockDelete }
      );
      controller.$onInit();

      expect(controller.isNewContact).toBe(true);
    });

    it('should call onSave when saveContact is called', () => {
      const payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onSave');
      controller.saveContact();
      expect(controller.onSave).toHaveBeenCalledWith(payload);
    });

    it('should call onUpdate when updateContact is called', () => {
      const payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onUpdate');
      controller.updateContact();
      expect(controller.onUpdate).toHaveBeenCalledWith(payload);
    });

    it('should call onDelete when deleteContact is called', () => {
      const payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onDelete');
      controller.deleteContact();
      expect(controller.onDelete).toHaveBeenCalledWith(payload);
    });

    it('should save tag when tagChange is called', () => {
      const event = { tag: 'friend' };

      spyOn(controller, 'updateContact');
      controller.tagChange(event);
      expect(controller.updateContact).toHaveBeenCalled();
      expect(controller.contact.tag).toEqual(event.tag);
    });
  });
});
