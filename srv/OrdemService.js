const RegrasOrdens = require('./regrasEtapas/regrasOrdemService/RegrasOrdens');

class App extends cds.ApplicationService {

    async init(req) {

        const regrasOrdens = new RegrasOrdens(req);
        console.log("[CUSTOM] - service Ordem");
        // this.before('POST', 'OrdemVenda', regrasOrdens.start.bind(regrasOrdens));
        await super.init();
    }
}

module.exports = App;