# OptiMedia Hub

## Demo video of the project

https://www.youtube.com/watch?v=0tBSNBwwp30

## Introduction

OptiMedia Hub is an easy-to-use tool that helps you prepare images and videos for social media. It lets content creators quickly format their media for platforms like Instagram, Twitter, and Facebook. The app uses Cloudinary for processing media, Clerk for user authentication, and Neon PostgreSQL for managing data, all within a simple and friendly interface built with Next.js.

## Features

### 1. Image Optimization
- **Upload an Image**: Easily upload images through the "Image Optimizer" section.
- **Social Media Formats**: Optimize images for multiple social media formats, including:
  - Instagram Square (1:1)
  - Instagram Portrait (4:5)
  - Twitter Post (16:9)
  - Twitter Header (3:1)
  - Facebook Cover (205:78)
- **Automatic Optimization**: Images are automatically resized and cropped to fit the selected format.
- **Preview and Download**: Users can preview the optimized image and download it, ready to be posted on social media.

### 2. Video Upload and Display
- **Video Input**: Upload videos with associated titles and descriptions.
- **Card Display**: Uploaded videos are showcased on the homepage in a card format, featuring:
  - Video Preview
  - Video Title
  - Video Description
  - Original Size
  - Compressed Size
  - A download button for the compressed video


## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Clerk**: A powerful authentication service for managing user sign-ins and registrations.
- **Neon PostgreSQL**: A serverless, cloud-native PostgreSQL database service, optimized for modern web apps.
- **DaisyUI**: A component library built on Tailwind CSS, used for crafting responsive and modern user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling and creating responsive designs.
- **Cloudinary**: A cloud-based media management service for optimizing and delivering images and videos.
- **Next Cloudinary**: A seamless integration of Cloudinary with Next.js, enabling advanced media processing.
- **React-Hot-Toast**: A lightweight notification library used to provide instant feedback to users.

### Deployment

OptiMedia Hub is deployed on Render. Here is the deployment link: https://optimedia-hub.onrender.com/
