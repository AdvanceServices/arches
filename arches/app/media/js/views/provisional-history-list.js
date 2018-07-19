define([
    'jquery',
    'underscore',
    'moment',
    'knockout',
    'arches',
    'views/list',
    'bindings/datepicker',
    'bindings/chosen',
    'views/components/simple-switch'
], function($, _, moment, ko, arches, ListView) {
    var ProvisionalHistoryList = ListView.extend({
        /**
        * A backbone view to manage a list of graph nodes
        * @augments ListView
        * @constructor
        * @name ProvisionalHistoryList
        */

        single_select: true,

        /**
        * initializes the view with optional parameters
        * @memberof ProvisionalHistoryList.prototype
        * @param {object} options
        */
        initialize: function(options) {
            var self = this;
            ListView.prototype.initialize.apply(this, arguments);

            this.updateList = function() {
                self.helploading(true);
                self.items.removeAll();
                $.ajax({
                    type: 'GET',
                    url: arches.urls.tile_history,
                    data: {start: this.start(), end: this.end()}
                }).done(function(data) {
                    self.helploaded(true);
                    self.helploading(false);
                    self.items(_.map(data, function(edit) {
                        edit.displaytime = moment(edit.lasttimestamp).format('DD-MM-YYYY hh:mm a');
                        return edit;
                    }));
                    if (self.sortAscending() === false) {
                        self.sortDesc();
                    }
                });
            };

            this.items = options.items;
            this.helploading = options.helploading;
            this.helploaded = options.helploaded;
            this.start = ko.observable();
            this.end = ko.observable();
            this.dateRangeType = ko.observable('custom');
            this.format = 'YYYY-MM-DD';
            this.dateRangeType = ko.observable();
            this.fromDate = ko.observable();
            this.toDate = ko.observable();
            this.sortAscending = ko.observable(true);

            this.sortAsc = function() {
                self.items.sort(function(a, b) {
                    return a.lasttimestamp === b.lasttimestamp ? 0 : (a.lasttimestamp < b.lasttimestamp ? -1 : 1);
                });
            };

            this.sortDesc = function() {
                self.items.sort(function(a, b) {
                    return a.lasttimestamp === b.lasttimestamp ? 0 : (a.lasttimestamp > b.lasttimestamp ? -1 : 1);
                });
            };

            this.sortAscending.subscribe(function(val) {
                console.log(val);
                if (val === false) {
                    self.sortDesc();
                } else {
                    self.sortAsc();
                }
            });

            this.dateRangeType.subscribe(function(value) {
                var today = moment();
                var from = today.format(this.format);
                var to = today.add(1, 'days').format(this.format);
                // Note: for DateTimeFields the end (to) date is non-inclusive in a
                // range query. Therefore the range must be one day longer than would
                // seem necessary.
                // (https://docs.djangoproject.com/en/2.0/ref/models/querysets/#range)
                switch (value) {
                case 'today':
                    break;
                case 'last-7':
                    from = today.subtract(7, 'days').format(this.format);
                    break;
                case 'last-30':
                    from = today.subtract(30, 'days').format(this.format);
                    break;
                case 'this-week':
                    from = today.day(0).format(this.format);
                    to = today.day(7).format(this.format);
                    break;
                case 'this-month':
                    from = today.date(1).format(this.format);
                    to = moment().month(today.month() + 1).date(1).format(this.format);
                    break;
                case 'this-quarter':
                    from = moment().date(1).quarter(today.quarter()).format(this.format);
                    to = moment().date(1).quarter(today.quarter() + 1).format(this.format);
                    break;
                case 'this-year':
                    var first = today.dayOfYear(1);
                    from = first.format(this.format);
                    to = first.add(1, 'years').format(this.format);
                    break;
                default:
                    return;
                }
                this.start(from);
                this.end(to);
                this.updateList();
            }, this);

            this.dateRangeType('last-30');
        }

    });
    return ProvisionalHistoryList;
});
