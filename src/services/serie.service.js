const serieSchema = require('../models/serie.model');
class SeriesService {
    async createSerie(serie) {
        serie.save();
        return serie;
    }

    async listSeries() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(serieSchema.find()), 3000);
        });
    }

    async showSerie(serieId) {
        return serieSchema.findById({ _id: serieId });
    }
    async showSerieActor(nameActor) {
        return serieSchema.find({
            'features_seasons.cast': {
                $all: [nameActor]
            }

        });

    }
    async showSeriePremiere(date) {
        return serieSchema.find({
            'features_seasons.premier_date': {
                $all: [date]
            }
        });

    }
    async editSerie(
        serieId,
        serie,
        number_seasons,
        original_lenguage,
        features_seasons
    ) {
        return serieSchema.findById({ _id: serieId }).then(() => {
            if (!serieId) throw Error('Serie no encontrada');
            return serieSchema.updateOne({ serieId }, {
                serie,
                number_seasons,

                original_lenguage,
                features_seasons
            });
        });
    }

    async removeSerie(serieId) {
        const serieRemove = serieSchema.findById({ _id: serieId });
        return serieSchema.deleteOne(serieRemove);
    }
}
module.exports = SeriesService;