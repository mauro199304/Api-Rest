const mongoose = require("mongoose");



const productSchema = new mongoose.Schema(

  {

    nombre: {

        type: String,

        trim: true

    },

    usuario: {

        type: String,

        trim: true

    },

    estado: {

        type: String,

        trim: true

      }

  }

);



module.exports = mongoose.model("Usuarios", productSchema);