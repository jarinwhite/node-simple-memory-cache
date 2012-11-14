exports['expiration time'] = function(beforeExit, assert) {
    var cache1 = new (require('./index.js')).MemoryCache();
    assert.equal(cache1.defaultExpirationTime, 60 * 1000, 'Ensure the default expiration time is set to 1 minute');
    
    var cache2 = new (require('./index.js')).MemoryCache({ expirationTime: 120 * 1000 });
    assert.equal(cache2.defaultExpirationTime, 120 * 1000, 'Ensure the expiration time is set according to the given options');
};

exports['put in default namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        assert.equal(cache.namespaces['default']['myKey']['value'], 'myValue', 'Ensure the value put in the cache is kept in the default namespace for a certain time');
    }, 500);
};

exports['put in default namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        assert.equal('myKey' in cache.namespaces['default'], false, 'Ensure the value put in the cache is deleted from the default namespace after a certain time');
    }, 1500);
};

exports['put in custom namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        assert.equal(cache.namespaces['custom']['myKey']['value'], 'myValue', 'Ensure the value put in the cache is kept in the custom namespace for a certain time');
    }, 500);
};

exports['put in custom namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        assert.equal('myKey' in cache.namespaces['custom'], false, 'Ensure the value put in the cache is deleted from the custom namespace after a certain time');
    }, 1500);
};

exports['get from default namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        assert.equal(cache.get('myKey'), 'myValue', 'Ensure the value put in the cache can be retrieved from the default namespace for a certain time');
    }, 500);
};

exports['get from default namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey'), 'Ensure the value put in the cache can no longer be retrieved from the default namespace after a certain time');
    }, 1500);
};

exports['get from custom namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        assert.equal(cache.get('myKey', 'custom'), 'myValue', 'Ensure the value put in the cache can be retrieved from the custom namespace for a certain time');
    }, 500);
};

exports['get from custom namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey', 'custom'), 'Ensure the value put in the cache can no longer be retrieved from the custom namespace after a certain time');
    }, 1500);
};

exports['del from default namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        cache.del('myKey');
    }, 250);
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey'), 'Ensure the value put in the cache can be deleted and no longer be retrieved from the default namespace');
    }, 500);
};

exports['del from custom namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        cache.del('myKey', 'custom');
    }, 250);
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey', 'custom'), 'Ensure the value put in the cache can be deleted and no longer be retrieved from the default namespace');
    }, 500);
};

exports['clear default namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        cache.clearNamespace();
    }, 250);
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey'), 'Ensure the value put in the cache can no longer be retrieved after clearing the default namespace');
    }, 500);
};

exports['clear default namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue');
    setTimeout(function() {
        cache.clearAll();
    }, 250);
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey'), 'Ensure the value put in the cache can no longer be retrieved after clearing all the namespaces');
    }, 500);
};

exports['clear custom namespace - 1'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        cache.clearNamespace('custom');
    }, 250);
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey', 'custom'), 'Ensure the value put in the cache can no longer be retrieved after clearing the custom namespace');
    }, 500);
};

exports['clear custom namespace - 2'] = function(beforeExit, assert) {
    var cache = new (require('./index.js')).MemoryCache({ expirationTime: 1000 });
    cache.put('myKey', 'myValue', 'custom');
    setTimeout(function() {
        cache.clearAll();
    }, 250);
    setTimeout(function() {
        assert.isUndefined(cache.get('myKey', 'custom'), 'Ensure the value put in the cache can no longer be retrieved after clearing all the namespaces');
    }, 500);
};

var id = setTimeout(function() {
    console.log('test');
}, 1000);
clearTimeout(id);
