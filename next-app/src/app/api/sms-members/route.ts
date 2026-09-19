import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SmsMember from '@/models/SmsMember';

const defaultMembers = [
    { name: "김미영", phone: "010-9142-7982" },
    { name: "김병철", phone: "010-3371-7107" },
    { name: "김상우", phone: "010-9140-8020" },
    { name: "김상철", phone: "010-8980-3564" },
    { name: "김춘배", phone: "010-9321-1183" },
    { name: "라찬숙", phone: "010-9535-4311" },
    { name: "박건용", phone: "010-3535-0111" },
    { name: "박영미", phone: "010-6866-8844" },
    { name: "백기성", phone: "010-2031-8000" },
    { name: "백상숙", phone: "010-6294-5982" },
    { name: "안 호", phone: "010-6488-2412" },
    { name: "유영식", phone: "010-2760-3519" },
    { name: "전상준", phone: "010-9609-1688" },
    { name: "전종철", phone: "010-4538-6724" },
    { name: "전창섭", phone: "010-5958-9945" },
    { name: "조병남", phone: "010-2276-6007" },
    { name: "최영애", phone: "010-6623-5695" },
    { name: "허남희", phone: "010-8586-2506" }
];

export async function GET() {
    try {
        await dbConnect();
        
        // 데이터가 아예 없는 경우 초기화
        let members = await SmsMember.find({}).sort({ name: 1 });
        if (members.length === 0) {
            await SmsMember.insertMany(defaultMembers);
            members = await SmsMember.find({}).sort({ name: 1 });
        }
        
        return NextResponse.json(members);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newMember = new SmsMember({
            name: body.name,
            phone: body.phone
        });
        await newMember.save();
        return NextResponse.json(newMember, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
