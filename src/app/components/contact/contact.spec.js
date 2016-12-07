describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module('components.auth', ($provide) => {
      $provide.value('AuthService', {
        getUser() {
          return { uid: 1 }
        },
        isAuthenticated() {
          return true;
        }
      });

      const child = (record) => { child: child };

      $provide.value('$firebaseRef', {
        contacts: {
          child: child
        }
      });
    });
    angular.mock.module(($stateProvider) => {
      $stateProvider.state('app', { url: '/' });
    });
    angular.mock.module('components.contact');
  });

  describe('ContactService', () => {
    let ContactService;
    let $rootScope;

    beforeEach(inject(($injector) => {
      ContactService = $injector.get('ContactService');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should get contacts', () => {
      // Pending
    });

    it('should get a contact', () => {
      const id = 1;
      const promise = ContactService.getContactById(id);

      promise.then((ref) => {
        expect(ref.key).toEqual(id);
      });

      $rootScope.$digest();
    });

    it('should create a contact', () => {
      const contact = { email: 'test@test.com', password: 'insecure' };
      const promise = ContactService.createNewContact(contact);

      promise.then((ref) => {
        expect(ref.key).toEqual(1);
      });

      $rootScope.$digest();
    });

    it('should update a contact', () => {
      const contact = { $save: angular.noop };

      spyOn(contact, '$save');
      ContactService.updateContact(contact);
      expect(contact.$save).toHaveBeenCalled();
    });

    it('should delete a contact', () => {
      const contact = { $remove: angular.noop };

      spyOn(contact, '$remove');
      ContactService.deleteContact(contact);
      expect(contact.$remove).toHaveBeenCalled();
    });
  });
});
