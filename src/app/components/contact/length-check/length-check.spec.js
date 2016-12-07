describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.contact');
  });

  describe('lengthCheck', () => {
    let $rootScope;
    let $compile;
    let element;

    beforeEach(inject(($injector) => {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');

      $rootScope.contact = { name: '' };
      element = angular.element('<input name="name" type="text" length-check ng-model="contact.name"></input>');
      $compile(element)($rootScope);
      $rootScope.$digest();
    }));

    it('should contain dynamic-input class', () => {
      expect(element.hasClass('dynamic-input')).toEqual(true);
    });

    it('should dynamically add dynamic-input--no-contents class', () => {
      const scope = element.scope();

      element.val('John Doe').triggerHandler('input');
      scope.$apply();

      expect(scope.contact.name).toBe('John Doe');
      expect(element.hasClass('dynamic-input--no-contents')).toEqual(false);

      element.val('').triggerHandler('input');
      scope.$apply();

      expect(scope.contact.name).toBe('');
      expect(element.hasClass('dynamic-input--no-contents')).toEqual(true);
    });
  });
});
