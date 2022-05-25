namespace db.documento;
using { managed, cuid} from '@sap/cds/common';


entity Documento : cuid , managed{
    pais            : Pais;
    numero_pedido   : Integer;
    etapa           : Association to one EtapaDocumento;
    tipo_processamento  : Association to one  TipoProcessamento;
    processamento_etapa : Composition of many   ProcessamentoEtapa on processamento_etapa.documento = $self;
    reprocessamento     : Integer;
    status              : Status default 'A';
}
entity ProcessamentoEtapa : cuid {
    documento               : Association to Documento;
    numero_retorno      : Integer;
    status_processamento: Status default 'A';
    etapa               : Association to one EtapaDocumento;    
}
entity EtapaDocumento  : cuid, managed {
    pais                : Pais;
    nome_etapa          : String;
    tipo_documento      : String;
    ordem_execucao      : Integer
}
entity TipoProcessamento : cuid {
    nome_tipo: String;
    etapas_tipo : Association to many EtapaDocumento
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
type StatusScheduler : String enum {
    ligado;
    desligado;
}


