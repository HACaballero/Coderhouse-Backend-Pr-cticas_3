const fs = require("fs");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }

  async save(item) {
    try {
      let contenido = await this.txtToJson();
      let newId = contenido[contenido.length - 1]["id"] + 1;
      item.id = newId;
      contenido.push(item);
      contenido = JSON.stringify(contenido);
      await fs.promises.writeFile(this.nameFile, contenido);
      return newId;
    } catch (e) {
      console.log(`Error en la lectura del archivo ${this.nameFile}  : ${e}`);
    }
  }
  async getById(id) {
    try {
      let contenido = await this.txtToJson();
      let filter = contenido.filter((i) => i.id == id);
      return filter;
    } catch (e) {
      console.log(`Error en la lectura del archivo ${this.nameFile} : ${e}`);
    }
  }
  async getAll() {
    try {
      let contenido = await this.txtToJson();
      return contenido;
    } catch (e) {
      console.log(`Error en la lectura del archivo ${this.nameFile} : ${e}`);
    }
  }
  async deleteById(id) {
    try {
      let contenido = await this.txtToJson();
      let filter = contenido.filter((i) => i.id != id);
      contenido = JSON.stringify(filter);
      console.log("FILTER ELIMINADO");
      console.log(contenido);
      await fs.promises.writeFile(this.nameFile, contenido);
      console.log(filter);
    } catch (e) {
      console.log(`Error en la lectura del archivo ${this.nameFile} : ${e}`);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nameFile, "[]");
    } catch (e) {
      console.log(`Error en la lectura del archivo ${this.nameFile} : ${e}`);
    }
  }

  async txtToJson() {
    let contenido = await fs.promises.readFile(this.nameFile, "utf-8");
    contenido = JSON.parse(contenido);
    return contenido;
  }
}

module.exports = Contenedor;
