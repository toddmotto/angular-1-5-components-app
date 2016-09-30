
var _ = require('lodash');


function buildDocData(doc) {
    return _.assign({
        name: doc.name,
        type: doc.docType,
        outputPath: doc.outputPath,
        url: doc.path,
    });
}

module.exports = function guidePagesProcessor(moduleMap) {
    return {
        $runAfter: ['paths-computed'],
        $runBefore: ['rendering-docs'],
        $process: process
    };

    function process(docs) {

        var guides = _(docs).filter(function(doc) {
          return doc.docType == 'content' && doc.module == 'guide';
        })

        .sortBy(function(page) {
            return page.sortOrder || page.path;
        })

        .map(buildDocData)

        .value();

        docs.push({
            name: 'GUIDE_DATA',
            template: 'constant-data.template.js',
            outputPath: 'src/guide-data.js',
            items: guides
        });
    }
};
