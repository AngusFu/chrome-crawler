
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.store = factory();
    }
}(this, function() {
    "use strict";

    var _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC'),
        _serialize = function(item) {
            return JSON.stringify(item);
        },
        _deserialize = function(data) {
            return data && JSON.parse(data);
        },
        _isSupported = function(storage) {
            var supported = false;
            if (storage && storage.setItem) {
                supported = true;
                var key = '__' + Math.round(Math.random() * 1e7);
                try {
                    storage.setItem(key, key);
                    storage.removeItem(key);
                } catch (err) {
                    supported = false;
                }
            }
            return supported;
        },
        _getStorage = function(storage) {
            if (typeof(storage) === 'string') {
                return window[storage];
            }
            return storage;
        },
        _isDate = function(date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        },
        _getExpDate = function(expires, now) {
            now = now || new Date();
            if (typeof expires === 'number') {
                expires = expires === Infinity ? _maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }
            if (expires && !_isDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }
            return expires;
        },
        _cacheItem = function(value, exp) {
            exp = exp || _maxExpireDate;
            return {
                c: new Date().getTime(),
                e: _getExpDate(exp).getTime(),
                v: value
            }
        };



    function Store() {
        this.storage = _getStorage('localStorage');
    }

    //默认不支持localStorage的不报错，包含隐私模式下同样的不报错，让页面正常运行
    Store.prototype = {
        constructor: Store,
        set: function() {},
        get: function() {},
        del: function() {},
        clearExp: function() {},
        clearAll: function() {}
    };

    if (_isSupported(_getStorage('localStorage'))) {
        Store.prototype = {
            constructor: Store,
            /**
             * 设置缓存，可以设置过期时间，单位：秒
             * @param key 缓存名称
             * @param val 缓存的值，如果未定义或为null，则删除该缓存
             * @param exp 缓存的过期时间
             * @returns {*}
             */
            set: function(key, val, exp) {
                if (typeof(key) !== 'string') {
                    console.warn(key + ' used as a key, but it is not a string.');
                }
                key = 'store_' + key;
                if (val === undefined || val === null) {
                    return this.del(key);
                }
                try {
                    this.storage.setItem(key, _serialize(_cacheItem(_serialize(val), exp)));
                } catch (e) {
                    console.error(e);
                }
                return val;
            },

            /**
             * 获取缓存
             * @param key 缓存名称
             * @returns {*} 缓存的值，默认已经做好序列化
             */
            get: function(key) {
                var item = this._get(key);
                if (item) {
                    return _deserialize(item.v);
                }
                return null;
            },

            _get: function(key) {
                var item = _deserialize(this.storage.getItem('store_' + key));
                return item;
            },
            /**
             *  删除指定的缓存
             * @param key 要删除缓存的主键
             * @returns {*}
             */
            del: function(key) {
                if (!/^store_/.test(key)) {
                    key = 'store_' + key;
                }
                this.storage.removeItem(key);
                return key;
            },

            /**
             *  删除所有过期的缓存
             * @returns {Array}
             */
            clearExp: function() {

                var length = this.storage.length,
                    caches = [],
                    _this = this;

                for (var i = 0; i < length; i++) {
                    var key = this.storage.key(i);
                    if (/^store_/.test(key)) {
                        if (!this.checkValid(key)) {
                            caches.push(key);
                        }
                    }
                }
                caches.forEach(function(key) {
                    _this.del(key);
                });
                return caches;
            },

            /**
             *  清空缓存
             */
            clearAll: function() {
                var length = this.storage.length,
                    caches = [],
                    _this = this;

                for (var i = 0; i < length; i++) {
                    var key = this.storage.key(i);
                    if (/^store_/.test(key)) {
                        caches.push(key);
                    }
                }
                caches.forEach(function(key) {
                    _this.del(key);
                });
            },

            checkValid: function(key) {
                var item = this._get(key);
                if (item && item.e) {
                    if (new Date().getTime() >= item.e) {
                        return false;
                    }  else {
                        return true;
                    }
                }

                return false;
            }
        }
    }
    return new Store();
})); 