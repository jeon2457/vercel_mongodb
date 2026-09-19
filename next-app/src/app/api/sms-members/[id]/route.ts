import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SmsMember from '@/models/SmsMember';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        
        // Ensure params are awaited for Next.js 15+ dynamic APIs
        const { id } = await params;
        
        const body = await request.json();
        const updatedMember = await SmsMember.findByIdAndUpdate(
            id,
            { name: body.name, phone: body.phone },
            { new: true }
        );
        
        if (!updatedMember) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }
        
        return NextResponse.json(updatedMember);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        
        const { id } = await params;
        
        const deletedMember = await SmsMember.findByIdAndDelete(id);
        
        if (!deletedMember) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Member deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
