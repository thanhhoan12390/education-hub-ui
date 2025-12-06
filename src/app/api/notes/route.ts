import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { NoteModel } from '~/models/NoteModel';

// GET /api/notes
export async function GET() {
    try {
        await connectDB();
        const notes = await NoteModel.find().sort({ _id: -1 });

        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error('[GET /notes] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
}

// POST /api/notes
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        // Validate
        const required = ['time', 'panelOrder', 'panelTitle', 'sectionOrder', 'sectionTitle', 'noteData'];

        for (const field of required) {
            if (body[field] === undefined || body[field] === null) {
                return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
            }
        }

        const newNote = new NoteModel(body);
        await newNote.save();

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error('[POST /notes] Error:', error);
        return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
    }
}
