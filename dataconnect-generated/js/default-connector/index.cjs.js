const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'personal_site',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

