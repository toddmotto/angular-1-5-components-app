'use strict';

angular
  .module('docs')
  .controller('ApiController', ApiController);

function ApiController(API_DATA) {

  var ctrl = this;
  ctrl.allPages = API_DATA;

}

ApiController.$inject = ["API_DATA"];
