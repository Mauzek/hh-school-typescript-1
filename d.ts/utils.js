export function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;

    if (promises.length === 0) return resolve(results);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      const result = fn.call(this, ...args);
      cache.set(key, result);
      return result;
    }
    console.log("Из кэша ↓↓↓");
    return cache.get(key);
  };
}

export function typedObject(schema) {
  return new Proxy(
    {},
    {
      set(target, prop, value, receiver) {
        if (typeof prop === "symbol") {
          return Reflect.set(target, prop, value, receiver);
        }

        if (!schema[prop]) {
          throw new TypeError(`Свойство ${prop} не описано в схеме`);
        }
        if (typeof value !== schema[prop]) {
          throw new TypeError(
            `Ожидается ${schema[prop]} для свойства ${prop}, получено ${typeof value}`,
          );
        }

        return Reflect.set(target, prop, value, receiver);
      },
    },
  );
}
