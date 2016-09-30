'use strict';

angular
  .module('docs')
  .config(config);

function config($locationProvider, $stateProvider, API_DATA, GUIDE_DATA, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/api');

  var sidebarTemplate = '<h4>Contents</h4>' +
    '<ol class="list-unstyled">' +
    '<li ng-repeat="page in ctrl.allPages">' +
    '<a href="{{page.url}}">{{page.name}}</a>' +
    '<ol class="list-unstyled" style="padding-left: 15px;">' +
    '<li ng-repeat="child in page.docs">' +
    '<a href="{{child.url}}">{{child.name}}</a>' +
    '</li>' +
    '</ol>' +
    '</li>' +
    '</ol>';

  var apiState = {
    name: 'api',
    url: '/api',
    views: {
      'main': {
        templateUrl: 'partials/api.html',
      },
      'sidebar': {
        template: sidebarTemplate,
        controller: 'ApiController as ctrl',
      }
    }
  }

  var guideState = {
    name: 'guide',
    url: '/guide',
    views: {
      'main': {
        templateUrl: 'partials/guide.html'
      },
      'sidebar': {
        template: sidebarTemplate,
        controller: 'GuideController as ctrl',
      }
    }
  }

  $stateProvider.state(apiState);
  $stateProvider.state(guideState);

  angular.forEach(API_DATA, function(parent) {

    var newState = {
      name: parent.stateName,
      url: '/' + parent.url,
      views: {
        'main': {
          templateUrl: parent.outputPath
        },
        'sidebar': {
          template: sidebarTemplate,
          controller: 'ApiController as ctrl'
        }
      }
    };

    $stateProvider.state(newState);

    angular.forEach(parent.docs, function(doc) {

      var newState = {
        name: doc.stateName,
        url: '/' + doc.url,
        views: {
          'main': {
            templateUrl: doc.outputPath
          },
          'sidebar': {
            template: sidebarTemplate,
            controller: 'ApiController as ctrl'
          }
        }
      };

      $stateProvider.state(newState);
    });
  });

  angular.forEach(GUIDE_DATA, function(parent) {

    var newState = {
      name: parent.name,
      url: '/' + parent.url,
      views: {
        'main': {
          templateUrl: parent.outputPath
        },
        'sidebar': {
          template: sidebarTemplate,
          controller: 'GuideController as ctrl'
        }
      }
    };

    $stateProvider.state(newState);

  });


}
config.$inject = ["$locationProvider", "$stateProvider", "API_DATA", "GUIDE_DATA", "$urlRouterProvider"];
