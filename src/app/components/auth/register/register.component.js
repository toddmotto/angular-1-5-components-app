import template from './register.html';

export const registerComponent = {
  template,
  controller: class RegisterComponent {
    constructor(AuthService, $state) {
      'ngInject';

      this.authService = AuthService;
      this.$state = $state;
    }
    $onInit() {
      this.error = null;
      this.user = {
        email: '',
        password: '',
      };
    }
    createUser(event) {
      return this.authService
        .register(event.user)
        .then(() => {
          this.$state.go('app');
        }, reason => {
          this.error = reason.message;
        });
    }
  },
};
