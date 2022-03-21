class ProcessamentoEtapasOrdemVenda {
    constructor(etapa,qtdMsg, limiteReprocessamento) {
        this.qtdMsg = qtdMsg;
        this.etapa = etapa;
        this.limiteReprocessamento = limiteReprocessamento;
    }

    async start(){
        console.log("start")
        try {
        let msgs = await this.getMessages();
        

        return true;
        } catch (error) {
            console.log(error);
            return false;
        }
       
    }
    async getMessages(){
        let msgs = await SELECT.from('db.ordens.OrdemVenda').where({etapa_ID : this.etapa})
        .limit(this.qtdMsg);
        console.log(msgs)
        return msgs;
    }

    async updateStatusMessages(){

    }
}
module.exports = ProcessamentoEtapasOrdemVenda