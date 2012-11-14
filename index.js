var MemoryCache = function(options) {
	var cache = {};
	if (!options) var options = {};
	
	// If the expiration time is set globally
	if ('expirationTime' in options && options['expirationTime'] > 0) {
		cache.defaultExpirationTime = options['expirationTime'];
	} else {
		cache.defaultExpirationTime = 60 * 1000;
	}
	
	cache.namespaces = {};
	cache.namespaces['default'] = {};
	
	// Clears all the keys in all the namespaces
	cache.clearAll = function() {
		for (var key in cache.namespaces) {
			cache.clearNamespace(key);
		}
		return cache;
	}
	
	cache.clearNamespace = function(namespace) {
		// If no namespace is provided, we clear the 'default' namespace
		if (!namespace || !(typeof namespace == 'string')) {
			var namespace = 'default';
		}
		
		// We clear all the timeouts executions of the namespace before deleting it
		for (var namespace in cache.namespaces) {
		    for (var key in cache.namespaces[namespace]) {
                var cachedValue = cache.namespaces[namespace][key];
                clearTimeout(cachedValue['timeoutId']);
		    }
		}
		
		// We delete the namespace
		delete cache.namespaces[namespace];
		
		// If it was the 'default' namespace, we recreate it empty
		if (namespace == 'default') {
			cache.namespaces['default'] =  {};
		}
		
		return cache;
	}
	
	cache.put = function(key, value, namespace, expirationTime) {
		// If no expiration time is provided, we use the globally defined expiration time
		if (arguments.length  < 4) var expirationTime = this.defaultExpirationTime;
		
		// If no namespace is provided, we use the 'default' namespace
		if (arguments.length < 3) var namespace = 'default';
		
		// If no value is provided, we throw an error
		if (arguments.length < 2) throw new Error('MEMORY CACHE : ERROR : You must provide a value');
		
		// If a non-valid key is provided, we throw an error
		if (arguments.length < 1 || !(typeof key == 'string') || key.length == 0) throw new Error('MEMORY CACHE : ERROR : You must provide a valid string for the key');
		
		// If the namespace doesn't exist yet, we create it
		if (!(namespace in cache.namespaces)) cache.namespaces[namespace] = {};
		
		// If the key is already stored in the namespace, we clear the previous timeout execution
		if (key in cache.namespaces[namespace]) {
		    clearTimeout(cache.namespaces[namespace][key]['timeoutId']);
		}
		
		// We store the value and the id of the timeout execution that will remove the key from the cache in the future
		cache.namespaces[namespace][key] = {
		    value: value,
		    timeoutId: setTimeout(function() {
		        delete cache.namespaces[namespace][key];
		    }, expirationTime)
		};
		
		return cache;
	};
	
	cache.get = function(key, namespace) {
	    // If no namespace is provided, we use the 'default' namespace
	    if (arguments.length < 2) var namespace = 'default';
	    
	    // If a non-valid key is provided, we throw an error
	    if (arguments.length < 1 || !(typeof key == 'string') || key.length == 0) throw new Error('MEMORY CACHE : ERROR : You must provide a valid string for the key');
        
        // If we can't find the namespace, we return undefined
        if (!(namespace in cache.namespaces)) return undefined;
        
        // If we can't find the key in the namespace, we return undefined
        if (!(key in cache.namespaces[namespace])) return undefined;
        
        // If we found the key, we return the value
        return cache.namespaces[namespace][key]['value'];
	};
	
	cache.del = function(key, namespace) {
	    // If no namespace is provided, we use the 'default' namespace
        if (arguments.length < 2) var namespace = 'default';
        
        // If a non-valid key is provided, we throw an error
        if (arguments.length < 1 || !(typeof key == 'string') || key.length == 0) throw new Error('MEMORY CACHE : ERROR : You must provide a valid string for the key');
        
        // If we can't find the namespace, we do nothing
        if (!(namespace in cache.namespaces)) return cache;
        
        // If we can't find the key in the namespace, we do nothing
        if (!(key in cache.namespaces[namespace])) return cache;
        
        // If we found the key, we clear the timeout execution, delete the value from the cache and return true
        clearTimeout(cache.namespaces[namespace][key]['timeoutId']);
        delete cache.namespaces[namespace][key];
        
        return cache;
	}
	
	return cache;
}

exports.MemoryCache = MemoryCache;
