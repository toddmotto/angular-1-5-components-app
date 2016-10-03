angular
    .module('docs')
    .constant('API_DATA', [
  {
    "name": "common",
    "stateName": "common",
    "type": "module",
    "outputPath": "partials/api/common.html",
    "url": "api/common",
    "docs": [
      {
        "name": "AppSidebarController",
        "stateName": "appSidebarController",
        "type": "type",
        "outputPath": "partials/api/common/type/AppSidebarController.html",
        "url": "api/common/type/AppSidebarController"
      },
      {
        "name": "app",
        "stateName": "app",
        "type": "directive",
        "outputPath": "partials/api/common/directive/app.html",
        "url": "api/common/directive/app"
      },
      {
        "name": "AppController",
        "stateName": "appController",
        "type": "type",
        "outputPath": "partials/api/common/type/AppController.html",
        "url": "api/common/type/AppController"
      }
    ]
  },
  {
    "name": "components",
    "stateName": "components",
    "type": "module",
    "outputPath": "partials/api/components.html",
    "url": "api/components",
    "docs": []
  },
  {
    "name": "components.auth",
    "stateName": "componentsAuth",
    "type": "module",
    "outputPath": "partials/api/components.auth.html",
    "url": "api/components.auth",
    "docs": [
      {
        "name": "AuthService",
        "stateName": "authService",
        "type": "service",
        "outputPath": "partials/api/components.auth/service/AuthService.html",
        "url": "api/components.auth/service/AuthService"
      }
    ]
  },
  {
    "name": "components.contact",
    "stateName": "componentsContact",
    "type": "module",
    "outputPath": "partials/api/components.contact.html",
    "url": "api/components.contact",
    "docs": [
      {
        "name": "ContactEditController",
        "stateName": "contactEditController",
        "type": "type",
        "outputPath": "partials/api/components.contact/type/ContactEditController.html",
        "url": "api/components.contact/type/ContactEditController"
      },
      {
        "name": "ContactService",
        "stateName": "contactService",
        "type": "service",
        "outputPath": "partials/api/components.contact/service/ContactService.html",
        "url": "api/components.contact/service/ContactService"
      },
      {
        "name": "lengthCheck",
        "stateName": "lengthCheck",
        "type": "directive",
        "outputPath": "partials/api/components.contact/directive/lengthCheck.html",
        "url": "api/components.contact/directive/lengthCheck"
      }
    ]
  }
]);
