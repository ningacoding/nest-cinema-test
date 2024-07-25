/**
 * Docs: https://github.com/typestack/class-transformer
 */
export class Serializer {
  constructor(partial, clazz) {
    let cache = [];
    const json = JSON.stringify(partial, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null;
    if (json) {
      const obj1 = JSON.parse(json);
      // const obj = plainToClass(clazz, obj1);
      Object.assign(this, obj1);
    }
  }
}
