const cds = require("@sap/cds");
const DocumentoBR = require("./regrasDocumentoBR/RegrasDocumentoBR");
const DocumentoCL = require("./regrasDocumentoCL/RegrasDocumentoCL");
const DocumentoCO = require("./regrasDocumentoCO/RegrasDocumentoCO");

let oMapaRegras = {
  BR: DocumentoBR,
  CL: DocumentoCL,
  CO: DocumentoCO,
};

class RegrasDocumento {
  constructor() {}
  async start(req) {
    try {
      let oRegrasDocumentoPais = await this.factory(req);
      await this.attDados(req, oRegrasDocumentoPais);
    } catch (error) {
      return req.error({
        message: "BEFOREPOST REGRASDocumento",
        status: 400,
    });
    }


  }

  async factory(req) {

    if (oMapaRegras[req.data.pais]) {
      let cRegras = new oMapaRegras[req.data.pais];
      let regrasDocumento = await cRegras.factory(req);
      
      return {
         dados : regrasDocumento.regras
      }
    }

    return req.reject(401, "País não cadastrado");
  }
  async attDados(req, dadosFactory){
    req.data.regras = dadosFactory.dados
  }





}

module.exports = RegrasDocumento;
