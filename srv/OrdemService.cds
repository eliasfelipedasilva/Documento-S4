using db.ordens as my from '../db/OrdemVenda';

@path : '/OrdemService'
// @(requires : 'system-user')
service OrdemService {
   entity OrdemVenda as projection on my.OrdemVenda;
   entity EtapaOrdemVenda as projection on my.EtapaOrdemVenda;

   action IniciaSchedulerEtapa(
      cronExpression: String,
      etapa : String,
      qtdMsg: Integer,
      limiteReprocessamento: Integer
      )
      returns String;
}
