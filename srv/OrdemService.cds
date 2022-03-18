using db.ordens as my from '../db/OrdemVenda';

@path : '/OrdemService'
@(requires : 'system-user')
service OrdemService {
   entity OrdemVenda as projection on my.OrdemVenda;
}
