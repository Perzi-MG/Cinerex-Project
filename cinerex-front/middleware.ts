import { NextRequest, NextResponse } from "next/server";

export default function MiddleWare(req: NextRequest) {
    if(req.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
}