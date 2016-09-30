function lengthCheck() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function ($element) {
      $element.addClass('dynamic-input');
      return function ($scope, $element, $attrs, $ctrl) {
        var dynamicClass = 'dynamic-input--no-contents';
        $scope.$watch(function () {
          return $ctrl.$viewValue;
        }, function (newValue) {
          if (newValue) {
            $element.removeClass(dynamicClass);
          } else {
            $element.addClass(dynamicClass);
          }
        });
      };
    }
  };
}

/**
 * @ngdoc directive
 * @name lengthCheck
 * @module components.contact
 *
 * @description
 *
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * @usage
 *
 * ### How to use
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 **/
angular
  .module('components.contact')
  .directive('lengthCheck', lengthCheck);
