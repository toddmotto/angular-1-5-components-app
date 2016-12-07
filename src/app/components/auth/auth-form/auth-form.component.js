import templateUrl from './auth-form.html';

export const formComponent = {
  bindings: {
    user: '<',
    button: '@',
    message: '@',
    onSubmit: '&',
  },
  templateUrl,
  controller: class FormComponent {
    constructor() {
      'ngInject';
    }
    $onChanges(changes) {
      if (changes.user) {
        this.user = angular.copy(this.user);
      }
    }
    submitForm() {
      this.onSubmit({
        $event: {
          user: this.user,
        },
      });
    }
  },
};
