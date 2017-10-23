var dropDigits = function() {
    return function(floatNum) {

        return String(floatNum)
            .split('.')
            .map(function(d, i) { return i ? d.substr(0, 2) : d; })
            .join('.');

    };

};
registrationModule.filter('dropDigitsFilter', dropDigits);