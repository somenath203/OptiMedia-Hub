'use client';

import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

import { LayoutProvider } from '@/app/_components/LayoutProvider';


const Page = () => {
  
  const [file, setFile] = useState(null);

  const { user } = useUser();


  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [isUploading, setIsUploading] = useState(false);

  const maxFileSize = 30 * 1024 * 1024; 

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!file) {
        return;
      }

      if (file?.size > maxFileSize) {
        alert('The size of file should be not be greater than 30 mb.');

        return;
      }

      setIsUploading(true);

      const formData = new FormData();

      formData.append('file', file);

      formData.append('title', title);

      formData.append('description', description);

      formData.append('originalSize', file?.size?.toString());

      formData.append('createdBy', user?.primaryEmailAddress?.emailAddress);

      
      const response = await axios.post('/api/video-upload', formData);

      if (response?.status === 200) {
        
        toast.success('Video has been uplaoded successfully successfully', { 
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
        });

      }
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong while uploading the video. Please try again later.', { 
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <LayoutProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full resize-none"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Video File</span>
            </label>

            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </LayoutProvider>
  );
};

export default Page;
