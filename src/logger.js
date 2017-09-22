import { Module } from '@complycloud/brane';
import { createLogger } from 'bunyan';

export default class BunyanLogger extends Module {
  get name() { return 'log'; }
  get dependencies() { return ['config']; }

  async start({ config }) {
    const {
      global: { service: { name } },
      log: { level },
    } = config;
    this.logger = createLogger({ name, level });
    this.logger.info('logger started');
  }

  async expose(component, context) {
    if (!component && !context) return this.logger;
    const params = Object.assign({}, context, { component: component.name });
    return this.logger.child(params);
  }
}
