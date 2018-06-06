define([
    'knockout',
    'views/tree-view'
], function(ko, TreeView) {
    var GraphTree = TreeView.extend({
        /**
        * A backbone view to manage a list of graph nodes
        * @augments TreeView
        * @constructor
        * @name GraphTree
        */

        filter_function: function(newValue){
            var filter = this.filter().toLowerCase();
            this.items().forEach(function(item){
                item.filtered(true);
                if (item.name().toLowerCase().indexOf(filter) !== -1 ||
                    item.datatype().toLowerCase().indexOf(filter) !== -1 ||
                    (!!(item.ontologyclass()) ? item.ontologyclass().toLowerCase().indexOf(filter) !== -1 : false)){
                    item.filtered(false);
                }
            }, this);
        },

        /**
        * initializes the view with optional parameters
        * @memberof GraphTree.prototype
        * @param {object} options
        * @param {boolean} options.graphModel - a reference to the selected {@link GraphModel}
        */
        initialize: function(options) {
            this.graphModel = options.graphModel;
            this.graphSettings = options.graphSettings;
            this.items = this.graphModel.get('nodes');
            this.branchListVisible = ko.observable(false);
            TreeView.prototype.initialize.apply(this, arguments);
        },

        /**
        * Returns a knockout computed used to calculate display name of the node
        * @memberof GraphTree.prototype
        * @param {object} node - a node in the tree
        */
        getDisplayName: function(node) {
            return ko.computed(function(){
                return node.name() + ' (' + node.ontologyclass_friendlyname().split('_')[0] + ')';
            }, this);
        },

        /**
        * Returns a knockout computed used to calculate display name of the node
        * @memberof GraphTree.prototype
        * @param {object} node - a node in the tree
        */
        isChildSelected: function(node) {
            var isChildSelected = function (parent) {
                var childSelected = false;
                if (!parent.istopnode) {
                    parent.children().forEach(function(child) {
                        if (child && child.selected() || isChildSelected(child)){
                            childSelected = true;
                        }
                    });
                    return childSelected;

                    };
                }
            return ko.computed(function() {
                return isChildSelected(node);
            }, this);
        },


        /**
        * Selects the passed in node
        * @memberof GraphTree.prototype
        * @param {object} node - the node to be selected via {@link GraphModel#selectNode}
        * @param {object} e - click event object
        */
        selectItem: function(node, e){
            if (!this.graphSettings.dirty()) {
                this.graphModel.selectNode(node);
                this.trigger('node-selected', node);
            }
        },

        toggleBranchList: function(node, e) {
            e.stopImmediatePropagation();
            this.branchListVisible(!this.branchListVisible());
            if(this.branchListVisible()){
                node.expanded(true);
            }
            this.trigger('toggle-branch-list');
        },

        addChildNode: function(node, e) {
            e.stopImmediatePropagation();
            this.graphModel.appendNode(node ,function(response, status){
                if(status === 'success') {
                    node.expanded(true);
                }
            }, this);
        },

        deleteNode: function(node, e) {
            e.stopImmediatePropagation();
            var parentNode = this.graphModel.getParentNode(node);
            this.graphModel.deleteNode(node);
        }

    });
    return GraphTree;
});
