describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.contact');
  });

  describe('ContactController', () => {
    let $componentController;
    let controller;
    const mockTag = 'friends';
    const mockChange = angular.noop;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactTag',
        { $scope: {} },
        { tag: mockTag, onChange: mockChange }
      );
    }));

    it('should bind to the correct tag', () => {
      var mockTag = 'football';
      controller.tag = mockTag;
      expect(controller.tag).toEqual(mockTag);
    });

    it('should call onSelect with the correct payload', () => {
      const tag = 'mate';
      const payload = { $event: { tag: tag }};

      spyOn(controller, 'onChange');
      controller.updateTag(tag);
      expect(controller.onChange).toHaveBeenCalledWith(payload);
    });
  });
});
