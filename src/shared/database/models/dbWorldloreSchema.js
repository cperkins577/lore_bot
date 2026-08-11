import mongoose from 'mongoose';

const dbWorldloreSchema = new mongoose.Schema({
    slug: {type: String, required: true},
    title: {type: String, required: true},
    summary: {type: String, required: false},
    body: {type: String, required: true},
    category: {type: String, required: true},
    tags: {type: Array, required: true},
    related_entries: {type: Array, required: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const db = mongoose.model('db', dbWorldloreSchema, 'worldlore');

export default db;