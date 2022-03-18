const cds = require("@sap/cds");
const OrdensBR = require("./regrasOrdemBR/RegrasOrdensBR");
const OrdensCL = require("./regrasOrdemCL/RegrasOrdensCL");
const OrdensCO = require("./regrasOrdemCO/RegrasOrdensCO");

let oMapaRegras = {
  BR: OrdensBR,
  CL: OrdensCL,
  CO: OrdensCO,
};

class RegrasOrdens {
  constructor() {}
  async start(req) {
    try {
      let oRegrasOrdemPais = await this.factory(req);
      await this.attDados(req, oRegrasOrdemPais);
    } catch (error) {
      return req.error({
        message: "BEFOREPOST REGRASORDENS",
        status: 400,
    });
    }


  }

  async factory(req) {

    if (oMapaRegras[req.data.pais]) {
      let cRegras = new oMapaRegras[req.data.pais];
      let regrasOrdem = await cRegras.factory(req);
      
      return {
         dados : regrasOrdem.regras
      }
    }

    return req.reject(401, "País não cadastrado");
  }
  async attDados(req, dadosFactory){
    req.data.regras = dadosFactory.dados
  }





}

module.exports = RegrasOrdens;
