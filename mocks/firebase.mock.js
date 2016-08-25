function MockFirebase () {}
MockFirebase.prototype.initializeApp = function () {};
window.firebase = new MockFirebase();

angular
  .module('firebase', [])
  .provider('$firebaseRef', function () {
    this.registerUrl = function (urls) {
      for (var key in urls) {
        this[key] = urls[key];
      }
    };
    this.$get = function () {
      return angular.noop;
    };
  })
  .factory('$firebaseArray', function ($q) {
    function FirebaseArray(ref) {}

    FirebaseArray.prototype = {
      constructor: FirebaseArray,
      $add: function (newData) {
        return $q.resolve({ key: 1 });
      }
    };

    return function () {
      return new FirebaseArray();
    };
  })
  .factory('$firebaseObject', function ($q) {
    function FirebaseObject() {
      return $q.when({ key: 1 });
    }

    return function () {
      return new FirebaseObject();
    };
  })
  .factory('$firebaseAuth', function ($q) {

    var fakeUser = { $id: 1 };

    function FirebaseAuth() {
      this.auth = null;
    }

    FirebaseAuth.prototype = {
      constructor: FirebaseAuth,
      $requireSignIn: function () {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $signInWithEmailAndPassword: function (email, password) {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $createUserWithEmailAndPassword: function () {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $waitForSignIn: function () {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $signOut: function () {
        this.auth = null;
        return $q.resolve(this.auth);
      }
    };

    return function () {
      return new FirebaseAuth();
    };
  });
