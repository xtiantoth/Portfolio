

function vm() {
    var self = this;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    //This is the formatter for the function to calculate the discount percentage in the Details partial view in real time.
    var percentFormatter = new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 4
    });

    self.description = ko.observable();

    self.retailPrice = ko.observable();
    self.retailPriceDisplay = ko.pureComputed(function () {
        return parseCurrency(self.retailPrice());
    });

    self.salePrice = ko.observable();
    self.salePriceDisplay = ko.pureComputed(function () {
        return parseCurrency(self.salePrice());
    });
    
    self.imagePath = ko.observable();

    function parseCurrency(num) {
        if (num === undefined) return formatter.format(0);
        return formatter.format(num);
    }
    //This is the function to calculate the discount percentage in the Details partial view in real time.
    self.discountPercentage = ko.pureComputed(function () {
        var percentage = (100 - self.salePrice() / self.retailPrice() * 100);
        return percentFormatter.format(percentage);
        
    });
};

ko.applyBindings(new vm());