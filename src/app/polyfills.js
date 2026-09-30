/**
 * Safari & Mobile Compatibility Polyfills
 * Must be imported at the very first line of main.jsx before any other imports,
 * so that modern ES2024 features used by @arcgis/core (such as Promise.withResolvers)
 * are available before ArcGIS SDK modules evaluate.
 */

// 1. Promise.withResolvers (ES2024 - required by @arcgis/core 4.30+ and 5.x on Safari < 17.4)
if (typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

// 2. Object.groupBy & Map.groupBy (ES2024)
if (typeof Object.groupBy === 'undefined') {
  Object.groupBy = function (items, callback) {
    const result = Object.create(null);
    let i = 0;
    for (const item of items) {
      const key = callback(item, i++);
      if (key in result) {
        result[key].push(item);
      } else {
        result[key] = [item];
      }
    }
    return result;
  };
}

// 3. Array modern methods (ES2023 - Safari < 16)
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function () {
    return this.slice().reverse();
  };
}
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function (compareFn) {
    return this.slice().sort(compareFn);
  };
}
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function (start, deleteCount, ...items) {
    const copy = this.slice();
    copy.splice(start, deleteCount, ...items);
    return copy;
  };
}
if (!Array.prototype.with) {
  Array.prototype.with = function (index, value) {
    const copy = this.slice();
    const actualIndex = index < 0 ? copy.length + index : index;
    copy[actualIndex] = value;
    return copy;
  };
}

// 4. requestIdleCallback fallback for Safari
if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'undefined') {
  window.requestIdleCallback = function (cb) {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      });
    }, 1);
  };
  window.cancelIdleCallback = function (id) {
    clearTimeout(id);
  };
}
