import { useState, useEffect } from "react";
import _ from "lodash";

const fetchAndUpdateData = async (url, updateData) => {
  const resp = await fetch(url);
  const json = await resp.json();
  updateData(json);
};

const debouncedFunctionCache = {}
/**
 * Static factory for debounced functions
 * 
 * The hashKey is created using the function to be debounced 'func' and the 'debounceMs' and additially the 'key'
 * 
 * @param {*} func - The function to be debounced
 * @param {*} debounceMs - Period for debounce
 * @param {string} [key] - Additional unique identifier for the static factory to use for caching the debounced function
 */
const getDebouncedFunction = (func, debounceMs, key = '') => {
  const hashKey = key + hash32(func.toString()) + debounceMs
  if (!debouncedFunctionCache[hashKey]) {
    const debouncedFunc = _.debounce(func, debounceMs);
    debouncedFunctionCache[hashKey] = debouncedFunc
  }
  return debouncedFunctionCache[hashKey]
}

export function useFetch(url, defaultData, debounceMs = 0) {
  const [data, updateData] = useState(defaultData);

  useEffect(() => {
    if (url) {
      if (debounceMs) {
        const debouncedFetchAndUpdateData = getDebouncedFunction(fetchAndUpdateData, debounceMs)
        debouncedFetchAndUpdateData(url, updateData);
      } else {
        fetchAndUpdateData(url, updateData);
      }
    } else {
      // clear the data
      updateData(null)
    }
  }, [url]);

  return data;
}

/**
 * Simple hash function..
 * from here: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * 
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as 
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hash32(str, asString, seed) {
  /*jshint bitwise:false */
  var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if( asString ){
      // Convert to 8 digit hex string
      return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }
  return hval >>> 0;
}
