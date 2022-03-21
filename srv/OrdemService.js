const RegrasOrdens = require('./regrasEtapas/regrasOrdemService/RegrasOrdens');
const Scheduler = require('./Scheduler')
class OrdemVenda extends cds.ApplicationService {

    async init(req) {

        const regrasOrdens = new RegrasOrdens(req);
        console.log("[CUSTOM] - service Ordem");
        this.on('IniciaSchedulerEtapa',this.IniciaSchedulerEtapa )
        this.before('UPDATE', 'ManagerOrdemVenda', this.configManagerOrdemVenda);
        this.before('CREATE', 'ManagerOrdemVenda', this.configManagerOrdemVenda);
        await super.init();
    }


    async configManagerOrdemVenda(req){
      if(req.data.status_scheduler == "ligado"){
        req.data.msg_status_scheduler = await Scheduler.IniciarScheduler(req.data)
      }
      console.log(req.data.msg_status_scheduler, "AQUI")
    }



}

module.exports = OrdemVenda;