var dropDigits = function($filter) {
    return function(floatNum, symbol) {

        var value = String(floatNum)
            .split('.')
            .map(function(d, i) { return i ? d.substr(0, 2) : d; })
            .join('.');

        return $filter('currency')(value, symbol, 2);
    };

};
registrationModule.filter('dropDigitsFilter', dropDigits);