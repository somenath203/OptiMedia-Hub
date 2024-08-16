import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {

  try {

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: 'You are unauthorized to access this route.',
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const file = formData.get('fileFromFrontend');

    if (!file) {
      return NextResponse.json(
        {
          error: 'No file uploaded or no file found.',
        },
        { status: 500 }
      );
    }

    const fileInBytes = await file.arrayBuffer();

    const fileBuffer = Buffer.from(fileInBytes);

    const result = await new Promise((resolve, reject) => {

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'next-ai-cloudinary-sass-folder-image',
          resource_type: 'image', 
        },
        (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        }
     );

     uploadStream.end(fileBuffer);

    });

    return NextResponse.json({

        publicIdOfUploadedFileInCloudinary: result?.public_id
        
    }, { status: 200 });


  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );

  } finally {

    await prisma.$disconnect();

  }
}
