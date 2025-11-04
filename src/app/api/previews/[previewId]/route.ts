import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { PreviewModel } from '~/models/CourseModel';

// GET /api/previews/:previewId
export async function GET(request: Request, { params }: { params: Promise<{ previewId: string }> }) {
    try {
        await connectDB();

        const { previewId } = await params;

        const preview = await PreviewModel.findOne({ previewId: Number(previewId) });
        if (!preview) return NextResponse.json({ error: 'Preview id not found' }, { status: 404 });

        return NextResponse.json(preview);
    } catch (error) {
        console.error('❌ Error fetching preview:', error);
        return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 500 });
    }
}
