import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';


const prisma = new PrismaClient();


export async function GET(request) {

    try {

        const userDetailsFromClerk = await currentUser();

       
        const allVideos = await prisma.videoModel.findMany({
            where: {
                createdBy: userDetailsFromClerk?.primaryEmailAddress?.emailAddress
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(allVideos);

    } catch (error) {

        console.log(error);
        
        return NextResponse.json({
            error: 'Something went wrong. Please try again after sometime.'
        }, {
            status: 500
        });

    } finally {

        await prisma.$disconnect();

    }

}