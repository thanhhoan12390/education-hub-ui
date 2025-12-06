import mongoose, { Schema, models } from 'mongoose';
import type { Note } from '~/types';
import { getNextSequence } from '~/lib/getNextSequence';

const NoteSchema = new Schema<Note>({
    noteId: { type: Number, required: false, unique: true },
    time: { type: Number, required: true },
    panelOrder: { type: Number, required: true },
    panelTitle: { type: String, required: true },
    sectionOrder: { type: Number, required: true },
    sectionTitle: { type: String, required: true },
    noteData: { type: String, required: true },
});

// Thêm middleware trước khi lưu
NoteSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.noteId = await getNextSequence('noteId');
    }
    next();
});

export const NoteModel = models.Note || mongoose.model<Note>('Note', NoteSchema);
