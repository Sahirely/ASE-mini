var dropDigits = function($filter) {
    return function(floatNum, symbol) {

        var value = String(floatNum)
            .split('.')
            .map(function(d, i) { return i ? d.substr(0, 2) : d; })
            .join('.');
        if (typeof symbol == "undefined")
            return $filter('number')(value, 2)
        else
            return $filter('currency')(value, symbol, 2);
    };

};
registrationModule.filter('dropDigitsFilter', dropDigits);