const RegrasOrdens = require('./regrasEtapas/regrasOrdemService/RegrasOrdens');
const Scheduler = require('./Scheduler')
class OrdemVenda extends cds.ApplicationService {

    async init(req) {

        const regrasOrdens = new RegrasOrdens(req);
        console.log("[CUSTOM] - service Ordem");
        this.on('IniciaSchedulerEtapa',this.IniciaSchedulerEtapa )
        // this.before('POST', 'OrdemVenda', regrasOrdens.start.bind(regrasOrdens));
        await super.init();
    }

    async IniciaSchedulerEtapa(req){
      let task =   Scheduler.IniciarScheduler(req.data);
      return task;
    }
}

module.exports = OrdemVenda;