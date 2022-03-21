let cron = require('node-cron');
let ProcessamentoEtapasOrdemVenda = require('./ProcessamentoOrdem')

let task;
module.exports ={
     IniciarScheduler(data){

        let cProcessamentoEtapasOrdemVenda = new ProcessamentoEtapasOrdemVenda(data.etapa,data.qtdMsg, data.limiteReprocessamento);
        let start;

       if(task){
           task.stop();
       } 
       task =  cron.schedule(data.cronExpression, function() {
            console.log("running a task ..."  + data.cronExpression);
            cProcessamentoEtapasOrdemVenda.start();
          });
        
        if(task){
            return "Start Scheduler para etapa"
        }

    }
    
}
