import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { NoteModel } from '~/models/NoteModel';

// PATCH /api/notes/:noteId
export async function PATCH(request: Request, { params }: { params: Promise<{ noteId: string }> }) {
    try {
        await connectDB();
        const { noteId } = await params;
        const id = Number(noteId);

        if (!id) {
            return NextResponse.json({ error: 'Invalid or missing noteId' }, { status: 400 });
        }

        const updates = await request.json();

        const updatedNote = await NoteModel.findOneAndUpdate({ noteId: id }, updates, { new: true });

        if (!updatedNote) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json(updatedNote, { status: 200 });
    } catch (error) {
        console.error('[PATCH /notes/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
    }
}

// DELETE /api/notes/:noteId
export async function DELETE(request: Request, { params }: { params: Promise<{ noteId: string }> }) {
    try {
        await connectDB();
        const { noteId } = await params;
        const id = Number(noteId);

        if (!id) {
            return NextResponse.json({ error: 'Invalid or missing noteId' }, { status: 400 });
        }

        const deleted = await NoteModel.findOneAndDelete({ noteId: id });

        if (!deleted) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('[DELETE /notes/:id] Error:', error);
        return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
    }
}
