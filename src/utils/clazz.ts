import { Serializer } from '../serializers/serializer';
import { serialize } from 'class-transformer';

export const Clazz = Object.freeze({
  createInstance<A extends Serializer>(data: any, c: new (data: any) => A): A {
    return new c({ ...(data?.dataValues || data) });
  },
  serialize<A extends Serializer>(data: any, c: new (data: any) => A): A {
    if (!c) {
      return null;
    }
    return JSON.parse(serialize(this.createInstance(data, c))) as A;
  },
});
