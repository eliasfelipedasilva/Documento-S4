using db.documento as my from '../db/Documento';

@path : '/EntradaDocumentoService'
@(requires : 'system-user')
service EntradaDocumentoService {
   entity Documento as projection on my.Documento;
}
