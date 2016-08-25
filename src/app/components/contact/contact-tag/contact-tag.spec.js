describe('Contact', function () {
  beforeEach(module('components.contact'));

  describe('ContactController', function () {
    var $componentController,
      controller,
      mockTag = 'friends',
      mockChange = angular.noop;

    beforeEach(inject(function ($injector) {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactTag',
        { $scope: {} },
        { tag: mockTag, onChange: mockChange }
      );
    }));

    it('should bind to the correct tag', function () {
      var mockTag = 'football';
      controller.tag = mockTag;
      expect(controller.tag).toEqual(mockTag);
    });

    it('should call onSelect with the correct payload', function () {
      var tag = 'mate',
        payload = { $event: { tag: tag }};

      spyOn(controller, 'onChange');
      controller.updateTag(tag);
      expect(controller.onChange).toHaveBeenCalledWith(payload);
    });
  });
});
