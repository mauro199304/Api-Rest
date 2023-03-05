const Usuarios = require("../models/mongo-usuarios");

const fs = require('fs-extra');







const getUsuarios = async (req, res) => {

  try {

    const usuarios = await Usuarios.find();

    return res.json(usuarios);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

};









const createUsuarios = async (req, res) => {

  console.log(req.body.urlHome);

  //  const { urlDashboard, urlHome } = req.body;

  //const { nombre,usuario,estado } = req.body

  const { nombre, usuario, estado } = req.body

  // if (!urlDashboard) return res.status(404).json({message: 'urlDashboard is required'})

  //if (!urlHome) return res.status(404).json({message: 'urlHome is required'})



  try {

      

    const newUsuarios = new Usuarios({

      nombre,

      usuario,

      estado

      });

    if (req.files?.image) {

      const result = await uploadImage(req.files.image.tempFilePath)

      newUsuarios.image = {

        public_id: result.public_id,

        secure_url: result.secure_url

      }

      await fs.unlink(req.files.image.tempFilePath)

    }



    const savedUsuarios = await newUsuarios.save();

    return res.json(savedUsuarios);

  } catch (error) {

    if (req.files?.image) {

      await fs.unlink(req.files.image.tempFilePath)

    }

    return res.status(500).json({ message: error.message });

  }

};





const deleteUsuarios = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedUsuarios = await Usuarios.findByIdAndDelete(id);



    if (!deletedUsuarios) return res.status(404).json({ message: 'Usuarios does not exists' })



    await deleteImage(deletedUsuarios.image.public_id)



    return res.json(deletedUsuarios);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

};





const updateUsuarios = async (req, res) => {

  const { id } = req.params;

  try {

    const updatedUsuarios = await Usuarios.findByIdAndUpdate(id, req.body, {

      new: true,

    });

    if (!updatedUsuarios)

      return res.status(404).json({ message: "Usuarios Not Found" });

    return res.json(updatedUsuarios);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

};





module.exports = { updateUsuarios, getUsuarios, createUsuarios, deleteUsuarios };