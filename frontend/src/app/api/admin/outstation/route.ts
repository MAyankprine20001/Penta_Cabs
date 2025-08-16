import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would use a database
// For demo purposes, we'll use in-memory storage
let outstationData: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['from', 'to', 'distance', 'duration', 'price', 'vehicleType'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Add timestamp and ID
    const tripData = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    // Store the data (in a real app, this would go to a database)
    outstationData.push(tripData);

    return NextResponse.json(
      { 
        message: 'Outstation trip data saved successfully',
        data: tripData 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving outstation data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      { 
        message: 'Outstation trips retrieved successfully',
        data: outstationData 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving outstation data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 