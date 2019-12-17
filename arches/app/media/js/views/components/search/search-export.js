define(['jquery',
    'knockout',
    'arches',
    'bindings/fadeVisible'],
function($, ko, arches) {
    var componentName = 'search-export';
    return ko.components.register(componentName, {
        viewModel: function(params) {
            var self = this;
            this.total = params.total;
            this.query = params.query;
            this.downloadStarted = ko.observable(false);
            this.format = ko.observable('tilecsv');
            this.precision = ko.observable(6);
            this.result = ko.observable();
            this.emailInput = ko.observable(arches.userEmail);

            this.url = ko.computed(function() {
                var url = arches.urls.export_results;
                var urlparams = ko.unwrap(self.query);
                urlparams.format = self.format();
                urlparams.precision = self.precision();
                urlparams.total = self.total();
                url = url + '?' + $.param(urlparams);
                return url;
            });

            this.getExportData = function(){
                var payload = ko.unwrap(this.query);
                payload.format = this.format();
                payload.precision = this.precision();
                payload.total = this.total();
                payload.email = this.emailInput();
                $.ajax({
                    type: "GET",
                    url: arches.urls.export_results,
                    data: payload
                }).done(function(response) {
                    self.downloadStarted(true);
                    window.setTimeout(function(){
                        self.downloadStarted(false);
                    }, 9000);
                    self.result(response.message);
                });
            };

            this.executeExport = function(limit){
                if (this.total() > limit) {
                    this.getExportData();
                } else if (this.total() > 0) {
                    window.open(this.url());
                }
            };

        },
        template: { require: 'text!templates/views/components/search/search-export.htm'}
    });
});
