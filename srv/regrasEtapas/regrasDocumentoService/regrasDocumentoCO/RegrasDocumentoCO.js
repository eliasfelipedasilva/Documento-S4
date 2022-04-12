const cds = require("@sap/cds");

class RegrasDocumentoCO {
  constructor() {}

  async factory(req) {
    let data1 = await this.regra1(req);
    let data2 = await this.regra2(req);

    return {
      regras: data1 + data2,
    };
  }
  async regra1(req) {
    return "Regra1 CO";
  }
  async regra2(req) {
    return " Regra2 CO";
  }
}

module.exports = RegrasDocumentoCO;
