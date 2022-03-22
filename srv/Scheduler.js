let schedule = require('node-schedule');
let ProcessamentoEtapasOrdemVenda = require('./ProcessamentoOrdem')

let task;
module.exports ={
  IniciarScheduler(data){
    try {
      let cProcessamentoEtapasOrdemVenda = new ProcessamentoEtapasOrdemVenda(data.etapa_ID,data.qtd_a_processar, data.limite_reproc);
      let current_job = schedule.scheduledJobs[data.ID];
      let msg;
      if(current_job){
        current_job.cancel();
      }
      task =  schedule.scheduleJob(data.ID,data.cronExpression, function() {
            cProcessamentoEtapasOrdemVenda.start();
          });
      if(task && !current_job){
        return "Scheduler iniciado. Manager ID : "+ data.ID;
      }else if(task && current_job) {
        let data_reinicio = new Date();
        msg = 'Scheduler reiniciado -' + data_reinicio.toISOString() + ' - Manager ID : '+ data.ID;
        return msg;
      }
      return "Erro ao iniciar scheduler. Manager ID : "+ data.ID;
    } catch (error) {
        console.log(error);
        return "Erro ao iniciar scheduler. Manager ID : "+ data.ID;
    }
    if(task){
        return "Start Scheduler para etapa"
    }
  },
  DesligarScheduler(data) {
    let current_job = schedule.scheduledJobs[data.ID];
    let msg;
    if(current_job){
      current_job.cancel();
    }
    return "Sheduler desligado. Manager ID : "+ data.ID;
  }
    
}
