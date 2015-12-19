'use strict';

import Reflux from 'reflux';

const PageActions = Reflux.createActions([

  'listPages',
  'getPage',
  'getNewPage',
  'savePage',
  'deletePage',
  'getTemplates',
  'clearData'

]);

export default PageActions;
