describe('Contact', function () {
  beforeEach(module('components.auth', function($provide){
    $provide.value('AuthService', {
      getUser: function() {
        return { uid: 1 }
      },
      isAuthenticated: function() {
        return true;
      }
    });

    var child = function(record) {
      return { child: child }
    };

    $provide.value('$firebaseRef', {
      contacts: {
        child: child
      }
    })
  }));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('app', { url: '/' });
  }));

  beforeEach(module('components.contact'));

  describe('ContactService', function () {
    var ContactService,
      $rootScope;

    beforeEach(inject(function ($injector) {
      ContactService = $injector.get('ContactService');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should get contacts', function () {
      // Pending
    });

    it('should get a contact', function () {
      var id = 1,
        promise = ContactService.getContactById(id);

      promise.then(function(ref){
        expect(ref.key).toEqual(id);
      });

      $rootScope.$digest();
    });

    it('should create a contact', function () {
      var contact = { email: 'test@test.com', password: 'insecure' }
        promise = ContactService.createNewContact(contact);

      promise.then(function(ref){
        expect(ref.key).toEqual(1);
      });

      $rootScope.$digest();
    });

    it('should update a contact', function () {
      var contact = { $save: angular.noop };

      spyOn(contact, '$save');
      ContactService.updateContact(contact);
      expect(contact.$save).toHaveBeenCalled();
    });

    it('should delete a contact', function () {
      var contact = { $remove: angular.noop };

      spyOn(contact, '$remove');
      ContactService.deleteContact(contact);
      expect(contact.$remove).toHaveBeenCalled();
    });
  });
});