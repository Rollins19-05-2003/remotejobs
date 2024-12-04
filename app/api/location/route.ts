import { NextResponse } from 'next/server';
export async function GET() {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fetching user location ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const response = await fetch(`https://ipapi.co/json`); // https://ipapi.co/103.167.172.126/json/
    const locationData = await response.json();

    return NextResponse.json(locationData);
}