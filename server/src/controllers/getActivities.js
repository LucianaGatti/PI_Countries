const { Activity } = require ("../db");


const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({error: "Error al obtener las actividades turísticas"});
    }
}



module.exports = getActivities;