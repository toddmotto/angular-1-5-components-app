var _ = require('lodash');


function buildDocData(doc, extraData) {

    // So that we can create states even though our module names contain dots(.)
    // in UI-Router dotted notation means it's a child state, so this is problematic
    // if we are following AngularJS styleguides and conventions regarding
    // naming of our Modules
    // #hack #lazy
    var splitName = doc.name.split('.');
    doc.stateName = _.camelCase(splitName);

    return _.assign({
        name: doc.name,
        stateName: doc.stateName,
        type: doc.docType,
        outputPath: doc.outputPath,
        url: doc.path,
    }, extraData);
}

module.exports = function apiPagesProcessor(moduleMap) {
    return {
        $runAfter: ['paths-computed'],
        $runBefore: ['rendering-docs'],
        $process: process
    };

    function process(docs) {

        var apiPages = _(docs)

            .filter(function(doc) {
                // We are not interested in docs that are not in a module
                // We are only interested in pages that are not landing pages
                return doc.docType !== 'componentGroup';
            })

            .filter('module')

            .groupBy('module')

            .map(function(moduleDocs, moduleName) {

                var moduleDoc = _.find(docs, {
                    docType: 'module',
                    name: moduleName
                });

                if (!moduleDoc) return;

                return buildDocData(moduleDoc, {
                    docs: moduleDocs

                    .filter(function(doc) {
                        // Private isn't set to true, just to an empty string if @private is supplied
                        return doc.docType !== 'module';
                    })

                    .map(buildDocData)
                });

            })

            .filter() //remove null items

            .value();

        docs.push({
            name: 'API_DATA',
            template: 'constant-data.template.js',
            outputPath: 'src/api-data.js',
            items: apiPages
        });
    }
};
