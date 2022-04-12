const RegrasDocumento = require('./regrasEtapas/regrasDocumentoService/RegrasDocumento');
const Scheduler = require('./ControlaScheduler')
class Documento extends cds.ApplicationService {

    async init(req) {

        const regrasDocumento = new RegrasDocumento(req);
        console.log("[CUSTOM] - service Documento");
        this.on('IniciaSchedulerEtapa',this.IniciaSchedulerEtapa )

        await super.init();
    }



    async IniciaSchedulerEtapa(req){
      let msg_status_scheduler;
      if(req.data.status_scheduler == "ligado"){
        msg_status_scheduler = await Scheduler.IniciarScheduler(req.data)
      }else if(req.data.status_scheduler == "desligado"){
        msg_status_scheduler = await Scheduler.DesligarScheduler(req.data)
      }
      return msg_status_scheduler;
    }



}

module.exports = Documento;