describe('Contact', function () {
  beforeEach(module('components.contact'));

  describe('ContactDetailController', function () {
    var $componentController,
      controller,
      mockContact = { $id: 1 },
      mockSave = angular.noop,
      mockUpdate = angular.noop,
      mockDelete = angular.noop;

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactDetail',
        { $scope: {} },
        { contact: mockContact, onSave: mockSave, onUpdate: mockUpdate, onDelete: mockDelete }
      );
    }));

    it('should bind to the correct contact', function () {
      expect(controller.contact.$id).toEqual(mockContact.$id);
      controller.$onInit();

      expect(controller.isNewContact).toBe(false);
    });

    it('should initialize isNewContact if no $id is present', function() {
      controller = $componentController('contactDetail',
        { $scope: {} },
        { contact: {}, onSave: mockSave, onUpdate: mockUpdate, onDelete: mockDelete }
      );
      controller.$onInit();

      expect(controller.isNewContact).toBe(true);
    });

    it('should call onSave when saveContact is called', function () {
      var payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onSave');
      controller.saveContact();
      expect(controller.onSave).toHaveBeenCalledWith(payload);
    });

    it('should call onUpdate when updateContact is called', function () {
      var payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onUpdate');
      controller.updateContact();
      expect(controller.onUpdate).toHaveBeenCalledWith(payload);
    });

    it('should call onDelete when deleteContact is called', function () {
      var payload = { $event: { contact: mockContact } };

      spyOn(controller, 'onDelete');
      controller.deleteContact();
      expect(controller.onDelete).toHaveBeenCalledWith(payload);
    });

    it('should save tag when tagChange is called', function () {
      var event = { tag: 'friend' };

      spyOn(controller, 'updateContact');
      controller.tagChange(event);
      expect(controller.updateContact).toHaveBeenCalled();
      expect(controller.contact.tag).toEqual(event.tag);
    });
  });
});