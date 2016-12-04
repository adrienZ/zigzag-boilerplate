(function() {
    let s = window.String.__proto__

    s.truncate = function(length = 5, separator = "...") {
        return this.subs(0, length) + separator
    }
    s.removeFirstChar = function() {
        return this.subs(1, this.length)
    }
    s.removeLastChar = function() {
        return this.subs(0, this.length - 1)
    }
    s.isEmail = function() {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this)
    }
    s.isUrl = function() {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(this)
    }
    s.isHTML = function() {
        return /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/.test(this)
    }

    let o = window.Object.__proto__;

    o.clone = function() {
        return Object.assign({}, this);
    }
    o.toArray = function() {
        const obj = this
        return Object.keys(obj).map(key => obj[key])

    }
    o.forEach = function(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('Object ForEach callback must be type of function');

        return Object.keys(this).map(callback);
    };
})(window)
