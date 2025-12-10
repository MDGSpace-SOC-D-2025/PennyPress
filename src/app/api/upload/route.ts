import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {

    const data = await request.formData();
    const file = data.get("file") as File | null;
    const metadata = data.get("metadata") as string; 

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const pinataFormData = new FormData();
    
    pinataFormData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: file.name, 
      keyvalues: {
        encryptedMetadata: metadata 
      }
    });
    pinataFormData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    pinataFormData.append("pinataOptions", pinataOptions);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: pinataFormData,
    });

    if (!response.ok) {
      throw new Error(`Pinata API Error: ${response.statusText}`);
    }

    const pinataData = await response.json();

    return NextResponse.json(pinataData, { status: 200 });

  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}