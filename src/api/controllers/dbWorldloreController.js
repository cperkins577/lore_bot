import db from '../../shared/database/models/dbWorldloreSchema.js';

export const getEntry = async (req, res) => {
    try {
        const entry = await db.find();
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getEntryBySlug = async (req, res) => {
    const slug = req.params.slug;
    try {
        const entry = await db.find( { slug: slug } );
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getEntryById = async (req, res) => {
    const id = req.params.id;
    try {
        const entry = await db.findById({ _id: id });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getDirectories = async (req, res) => {
    try {
        const directories = await db.find({ category: "Directory" }, { title: 1, summary: 1 });
        res.json(directories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}