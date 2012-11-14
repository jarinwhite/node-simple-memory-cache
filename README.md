# node-simple-memory-cache

A very simple memory cache for node.js.
It supports namespacing for keys (with the ability to clear a whole namespace), timeouts (set globally or on a key-per-key basis).
Unlike other caches based on Redis for instance, you can cache objects with all their properties and methods.

## Installation

```
npm install node-simple-memory-cache
```

## Usage

### Initialize

```
var cache = new (require('memory-cache')).MemoryCache();
```

### Options

- `defaultExpirationTime`: the default time in milliseconds after which an entry is cleared from the cache

### Put an entry in the cache

```
cache.put('myKey', 'myValue', [namespace, [expirationTime]])
```

Store the value `myValue` under the `myKey` key in the specified namespace (or the 'default' namespace if none is provided) for `expirationTime` (or the default expiration time if none is provided).
