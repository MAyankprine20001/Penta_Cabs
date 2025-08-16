import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would use a database
// For demo purposes, we'll use in-memory storage
const airportData: Array<{
  id: string;
  airportCity: string;
  airportName: string;
  airportCode: string;
  serviceType: string;
  otherLocation: string;
  dateTime: string;
  distance: string;
  cars: Array<{
    type: string;
    available: boolean;
    price: number;
  }>;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['airportCity', 'airportName', 'airportCode', 'serviceType', 'otherLocation', 'distance', 'cars'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate cars array
    if (!Array.isArray(data.cars) || data.cars.length === 0) {
      return NextResponse.json(
        { error: 'Cars array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Add timestamp and ID
    const tripData = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    // Store the data (in a real app, this would go to a database)
    airportData.push(tripData);

    return NextResponse.json(
      { 
        message: 'Airport service data saved successfully',
        data: tripData 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving airport data:', error);
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
        message: 'Airport services retrieved successfully',
        data: airportData 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving airport data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 