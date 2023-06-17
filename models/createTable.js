const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

async function create() {
    let files = fs
        .readdirSync(__dirname)
        .filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                file !== basename &&
                file.slice(-3) === '.js' &&
                file.indexOf('.test.js') === -1
            );
        })

    const models = [];
    for (const file1 of files) {
        if (file1 === 'index.js') {
            continue;
        }

        let model = require(path.join(__dirname, file1));
        await model.sync();
        models[model.name] = model;
    }

    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
}

module.exports = create();