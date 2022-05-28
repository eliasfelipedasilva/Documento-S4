namespace db.documento;
using { managed, cuid} from '@sap/cds/common';


entity Documento : cuid , managed{
    pais            : Pais;
    numero_pedido   : Integer;
    tipo  : Association to one  TipoProcessamento;
    processamento_etapa : Composition of many   ProcessamentoEtapa on processamento_etapa.documento = $self;
    status              : Status default 'A';
}
entity ProcessamentoEtapa : cuid ,managed{
    documento               : Association to Documento;
    numero_retorno      : Integer;
    status: Status default 'N';
    etapa               : Association to one EtapaDocumento;
    reprocessamento     : Integer;
    ordem_execucao      : Integer;
}
entity EtapaDocumento  : cuid, managed {
    pais                : Pais;
    nome_etapa          : String;
    ordem_execucao      : Integer;
    etapa_final         : Boolean default false;
    reprocessamento_limite     : Integer;
    etapa2tipo : Association to many Etapa2Tipo on etapa2tipo.etapa = $self;
}
entity TipoProcessamento : cuid {
    nome_tipo: String;
    etapa2tipo : Association to many Etapa2Tipo on etapa2tipo.tipo_processamento = $self
    }
entity Etapa2Tipo {
    key etapa : Association to  EtapaDocumento;
    key tipo_processamento: Association to  TipoProcessamento;
}


type Pais : String enum {
    BR;
    CL;
    CO;
    AR
}
type Status : String enum {
    N;
    A;
    P;
    E;
    S;
}
type StatusScheduler : String enum {
    ligado;
    desligado;
}


