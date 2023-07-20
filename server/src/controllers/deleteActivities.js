const { Activity } = require ("../db");

const deleteActivities = async (req, res) => {
    const { id } = req.params; //vamos a /activity/1 (por ejemplo) y eliminamos la actividad con ese id
    try {
        await Activity.destroy({
            where: { id }
        });
        res.status(200).send("Actividad eliminada") // si todo sale bien, respondemos con el string
    } catch (error) {
        return res.status(500).json({error: "Error al eliminar la actividad"});
    }
}

module.exports = deleteActivities;