class ProcessamentoEtapasOrdemVenda {
    constructor(etapa,qtdMsg, limiteReprocessamento) {
        this.qtdMsg = qtdMsg;
        this.etapa = etapa;
        this.limiteReprocessamento = limiteReprocessamento;
    }

    async start(){
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
        let msgs = await SELECT.from('db.ordens.OrdemVenda')
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
        let tx = cds.tx()
        msgs.map((item)=>{
            tx.run(UPDATE.entity('db.ordens.OrdemVenda').with({status : 'P'}).where({ID : item.ID}))
        })
        await tx.commit()
    }
    async concluiMsgs(msgs){
        let tx = cds.tx()
        msgs.map((item)=>{
            tx.run(UPDATE.entity('db.ordens.OrdemVenda').with({status : 'S'}).where({ID : item.ID}))
        })
        await tx.commit()
    }
}
module.exports = ProcessamentoEtapasOrdemVenda