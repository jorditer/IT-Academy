import Location from "../models/coordinates.model.js";

export const getCoordinates = async (req, res) => {
    try {
        const coordinates = await Location.find({});
        res.status(200).json({ success: true, data: coordinates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}