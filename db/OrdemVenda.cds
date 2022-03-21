namespace db.ordens;
using { managed, cuid} from '@sap/cds/common';


entity OrdemVenda : cuid , managed{
    key pais          : Pais;
    key numero_pedido : Integer;
    numero_retorno    : Integer;
    tipo_ordem        : TipoOrdem;
    etapa             : Association to one EtapaOrdemVenda;
    reprocessamento   : Integer;
    status            : Status default 'A';
}

entity EtapaOrdemVenda :cuid, managed {
    pais              : Pais;
    nome_etapa        : String;
    ordem_execucao    : Integer
}

entity ManagerOrdemVenda : cuid, managed {
    pais              : Pais;
    etapa             : Association to one EtapaOrdemVenda;
    qtd_a_processar   : Integer;
    limite_reproc     : Integer;
}

type Pais : String enum {
    BR;
    CL;
    CO;
    AR
}
type Status : String enum {
    A;
    P;
    E;
    S;
}
type TipoOrdem : String enum {
    normal;
    marketplace;
    crossdocking;
}


