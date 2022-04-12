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
        let msgs = await this.getMessages();
        await this.processaMsgs(msgs);
        await this.concluiMsgs(msgs);
        return true;
        } catch (error) {
            console.log(error);
            return false;
        }
       
    }
    async getMessages(){
        let msgs = await SELECT.from('db.documento.Documento')
        .where({
            etapa_ID : this.etapa,
            and: {reprocessamento :{ '<=': this.limiteReprocessamento }},
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
            tx.run(UPDATE.entity('db.documento.Documento').with({status : 'P'}).where({ID : item.ID}))
        })
        await tx.commit()
    }
    async concluiMsgs(msgs){
        // concluiria o processamento instanciando executando metodos de classes de retorno
        // e por fim atualizaria os status da tabela geral 
        let tx = cds.tx()
        msgs.map((item)=>{
            tx.run(UPDATE.entity('db.documento.Documento').with({status : 'S'}).where({ID : item.ID}))
        })
        await tx.commit()
    }
}
module.exports = ProcessamentoEtapasDocumento