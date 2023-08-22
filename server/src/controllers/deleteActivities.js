const { Activity } = require ("../db");

const deleteActivities = async (req, res) => {
    const { id } = req.params; //vamos a /activity/1 (por ejemplo) y eliminamos la actividad con ese id
    try {
        await Activity.destroy({
            where: { id }
        });
        res.status(200).send("activity deleted successfully") // si todo sale bien, respondemos con el string diciendo que se pudo eliminar
    } catch (error) {
        return res.status(500).json({error: "could not delete activity"}); //si sale mal tambien respondemos 
    }
}

module.exports = deleteActivities;