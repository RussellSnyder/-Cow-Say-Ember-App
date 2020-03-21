import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'https://cow-say-2020.herokuapp.com';
  namespace = '';
}
