import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from './schema/schema.json';

export default getBabelRelayPlugin(schema.data);