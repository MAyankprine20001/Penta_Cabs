import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would use a database
// For demo purposes, we'll use in-memory storage
let localData: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['pickupLocation', 'dropLocation', 'distance', 'duration', 'basePrice', 'perKmPrice', 'vehicleType', 'serviceType'];
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
    localData.push(tripData);

    return NextResponse.json(
      { 
        message: 'Local trip data saved successfully',
        data: tripData 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving local data:', error);
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
        message: 'Local trips retrieved successfully',
        data: localData 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving local data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 