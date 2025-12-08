import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { NoteModel } from '~/models/NoteModel';

// GET /api/notes
export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        // Query params
        const filterMode = searchParams.get('filterMode') || 'all'; // all | match
        const sortOrder = searchParams.get('sortOrder') || 'newest'; // newest | oldest

        const sectionOrder = searchParams.get('sectionOrder');
        const panelOrder = searchParams.get('panelOrder');

        // Build filter
        const filter: {
            sectionOrder?: number;
            panelOrder?: number;
        } = {};

        if (filterMode === 'match') {
            if (sectionOrder !== null) filter.sectionOrder = Number(sectionOrder);
            if (panelOrder !== null) filter.panelOrder = Number(panelOrder);
        }

        // Build sort option
        const sortOption: { _id?: 1 | -1 } = {};

        if (sortOrder === 'newest') {
            sortOption._id = -1;
        } else if (sortOrder === 'oldest') {
            sortOption._id = 1;
        }

        // Query database
        const notes = await NoteModel.find(filter).sort(sortOption);

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
