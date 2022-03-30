const SeriesService = require('../services/serie.service');
const SerieModel = require('../models/serie.model');
const service = new SeriesService();
const express = require('express');
const serieRoutes = express.Router();

serieRoutes.post('/serie', async(req, res) => {
    try {
        const serie = SerieModel(req.body);
        const data = await service.createSerie(serie);
        res.status(201).json({ data });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
});

serieRoutes.get('/', async(req, res) => {
    try {
        const data = await service.listSeries();
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
});

serieRoutes.get('/:serieId', async(req, res) => {
    try {
        const { serieId } = req.params;
        const data = await service.showSerie(serieId);
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

//buscar las series en las cuales el actor a participado
serieRoutes.get('/Actor/:nameActor', async(req, res) => {
    try {
        const { nameActor } = req.params;
        const data = await service.showSerieActor(nameActor);
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// buscar la series que se estrenaron en la misma fecha
serieRoutes.get('/Date/:date', async(req, res) => {
    try {
        const { date } = req.params;
        const data = await service.showSeriePremiere(date);
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

serieRoutes.put('/:serieId', async(req, res) => {
    try {
        const { serieId } = req.params;
        const { serie, number_seasons, original_lenguage, features_seasons } = req.body;
        const data = await service.editSerie(
            serieId,
            serie,
            number_seasons,
            original_lenguage,
            features_seasons
        );
        res.status(200).json({ data });
    } catch (error) {
        res.status(204).json({ message: err });
    }
});

serieRoutes.delete('/:serieId', async(req, res) => {
    try {
        const { serieId } = req.params;
        const data = await service.removeSerie(serieId);
        res.status(200).json({ data });
    } catch (error) {
        res.status(204).json({ message: err });
    }
});

module.exports = serieRoutes;