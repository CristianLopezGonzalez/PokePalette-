import Coleccion from '../models/coleccion.js';
import {ColeccionPaleta} from "../models/associations.js";

class collectionController {

    static async createCollection(req, res) {
        try {

            const userId = req.user.id;
            const collectionName = req.body.nombre;
            const collectionDescription = req.body.descripcion;

            const existeCollection = await Coleccion.findOne({where:{nombre:collectionName,usuario_id:userId}})

            if(existeCollection){
                return res.status(400).json({
                    success: false,
                    message:"This collection already exists in your collections",
                })
            }

            const newCollection = await Coleccion.create({
                usuario_id: userId,
                nombre:collectionName,
                descripcion:collectionDescription,
            })

            return res.status(201).json({
                success: true,
                message:"Successfully created collection",
                collection: newCollection
            })

        }catch(e){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }

    }

    static async getUserCollections(req, res) {
        try {

            const userId = req.user.id;

            const allCollections = await Coleccion.findAll({where:{usuario_id: userId}})

            if (allCollections.length === 0){
                return res.status(200).json({
                    success: true,
                    message:"You dont have any collections",
                    collections: allCollections
                })
            }

            return res.status(200).json({
                success: true,
                collections: allCollections
            })

        }catch (e){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }

    }

    static async addPaletteToCollection(req, res) {

        try {

            const collectionId = req.params.collection_id;
            const paletaId = req.body.paleta_id;
            const userId = req.user.id;

            const collection = await Coleccion.findOne({ where: { id: collectionId, usuario_id: userId } })
            if (!collection) {
                return res.status(404).json({ success: false, message: 'Collection not found' })
            }

            const paletaAlreadyInCollection = await ColeccionPaleta.findOne({ where: { coleccion_id: collectionId, paleta_id: paletaId } })
            if (paletaAlreadyInCollection) {
                return res.status(400).json({ success: false, message: 'Palette already in collection' })
            }

            await ColeccionPaleta.create({ coleccion_id: collectionId, paleta_id: paletaId })
            return res.status(201).json({ success: true, message: 'Palette added to collection' })

        }catch(e){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }

    }

    static async removePaletteFromCollection(req, res) {
        try {
            const collectionId = req.params.collection_id;
            const paletaId = req.params.paleta_id;
            const userId = req.user.id;

            const collection = await Coleccion.findOne({ where: { id: collectionId, usuario_id: userId } })

            if (!collection) {
                return res.status(404).json({ success: false, message: 'Collection not found' })
            }

            await ColeccionPaleta.destroy({ where: { coleccion_id: collectionId, paleta_id: paletaId } })

            return res.status(200).json({
                success: true,
                message: 'Palette removed from collection',
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }
    }

    static async deleteCollection(req, res) {
        try {

            const userId = req.user.id;
            const collectionId = req.params.coleccion_id;

            const collectionExist = await Coleccion.findOne({where:{id:collectionId,usuario_id:userId}});

            if (!collectionExist) {
                return res.status(404).json({ success: false, message: 'Collection not found' })
            }

            const remove = await Coleccion.destroy({where:{id:collectionId}});

            return res.status(200).json({
                success: true,
                message: 'Collection deleted from collection',
            })

        }catch(e){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }

    }

    static async updateCollection(req, res) {
        try {
            const userId = req.user.id;
            const collectionId = req.params.coleccion_id;
            const { nombre, descripcion, publica } = req.body;

            const collection = await Coleccion.findOne({ where: { id: collectionId, usuario_id: userId } })
            if (!collection) {
                return res.status(404).json({ success: false, message: 'Collection not found' })
            }

            await collection.update({ nombre, descripcion, publica })

            return res.status(200).json({ success: true, message: 'Collection updated', collection })

        } catch (e) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }
}

export default collectionController