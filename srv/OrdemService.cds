using db.ordens as my from '../db/OrdemVenda';

@path : '/OrdemService'
// @(requires : 'system-user')
service OrdemService {
   entity OrdemVenda as projection on my.OrdemVenda;
   entity EtapaOrdemVenda as projection on my.EtapaOrdemVenda;
   entity ManagerOrdemVenda as projection on my.ManagerOrdemVenda;

@cds.redirection.target : false
  view qtdPorStatus as 
    select from my.OrdemVenda distinct {
      COUNT(
        *
      )as qtdPorStatus : Integer,
      status,
    }
    group by
      status;

   action IniciaSchedulerEtapa(
      cronExpression: String,
      etapa : String,
      qtdMsg: Integer,
      limiteReprocessamento: Integer
      )
      returns String;
}
