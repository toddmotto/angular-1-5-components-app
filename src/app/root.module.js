import common     from './common/app.module.js'
import components from './components/components.module.js'
import templates  from '../templates.js'

import '!style!css!sass!../sass/style.scss'

angular.module('root', [
  'common',
  'components',
  'templates'
]);

console.log('root.module.js');
