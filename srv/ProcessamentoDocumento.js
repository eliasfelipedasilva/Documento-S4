//mapa de classe das regras de cada etapa// // // // 

class ProcessamentoEtapasDocumento {
    constructor(etapa,qtdMsg, limiteReprocessamento) {
        this.qtdMsg = qtdMsg;
        this.etapa = etapa;
        this.limiteReprocessamento = limiteReprocessamento;
        
    }

    async start(){
        console.log("start proc")
        try {
        let etapa =  await SELECT.one('db.documento.EtapaDocumento')
        .where({
            ID : this.etapa
        });
        let msgs = await this.getMessages(etapa);
        await this.processaMsgs(msgs);
        await this.concluiMsgs(msgs,etapa);
        return true;
        } catch (error) {
            console.log(error);
            return false;
        }
       
    }
    async getMessages(etapa){
        
        let msgs = await SELECT.from('db.documento.ProcessamentoEtapa')
        .where({
            etapa_ID : this.etapa,
            and: {reprocessamento :{ '<=': etapa.reprocessamento_limite }},
            and: { status : 'A'}
        })
        .limit(this.qtdMsg)
        .orderBy ({ref:['createdAt'],sort:'asc'});
        return msgs;
    }

    async processaMsgs(msgs){
        // aqui seria chamado as classes de cada etapa especifica dinamicamente a ser processada,
        // usando o mapa de etapas
        let tx = cds.tx()
        msgs.map((item)=>{
            tx.run(UPDATE.entity('db.documento.ProcessamentoEtapa').with({status : 'P'}).where({ID : item.ID}))
        })
        await tx.commit()
    }
    async concluiMsgs(msgs,etapa){
        // concluiria o processamento instanciando executando metodos de classes de retorno
        // e por fim atualizaria os status da tabela geral 
        let tx = cds.tx()
        msgs.map((item)=>{
            //seta etapa como sucesso
            tx.run(UPDATE.entity('db.documento.ProcessamentoEtapa').with({status : 'S'}).where({ID : item.ID}))
            
            //seta proxima etapa como aguardando processamento
            if(!etapa.etapa_final)
            tx.run(UPDATE.entity('db.documento.ProcessamentoEtapa').with({status : 'A'}).where({documento_ID : item.documento_ID , ordem_execucao : item.ordem_execucao + 1 }))

            if(etapa.etapa_final){
                tx.run(UPDATE.entity('db.documento.Documento').with({status : 'S'}).where({ID : item.documento_ID}))
            }
        })

        console.log(msgs,etapa)
        await tx.commit()
    }
    async selecionarProximaEtapa(){

    }
}
module.exports = ProcessamentoEtapasDocumento