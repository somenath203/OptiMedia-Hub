'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { LayoutProvider } from './_components/LayoutProvider';
import VideoCard from './_components/VideoCard';
import { Loader2 } from 'lucide-react';


const Page = () => {

  const [ allVideos, setAllVideos ] = useState([]);

  const [ loading, setLoading ] = useState(false);

  const [ error, setError ] = useState(null);


  const fetchAllVideos = useCallback(async () => {

    try {

      setLoading(true);

      const response = await axios.get(`/api/all-videos`);

      if(response?.status === 200) {

        setAllVideos(response?.data);
        
      }
      
    } catch (error) {
      
      console.log(error);

      setError(error);
      
    } finally {

      setLoading(false);

    }

  }, []);


  useEffect(() => {

    fetchAllVideos();

  }, []);


  const handleDownloadVideo = useCallback((urlOfVideo, titleOfVideo) => {

      const link = document.createElement('a');

      link.href = urlOfVideo;

      link.setAttribute('download', `${titleOfVideo}.mp4`);

      link.setAttribute('target', '_blank');

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      
  }, []);


  if (loading) {
    return <LayoutProvider>
      
      <div className="min-h-screen mt-32 flex justify-center">

        <Loader2 size={30} className='text-white transition-all animate-spin duration-700' />

      </div>

    </LayoutProvider>
  }


  return <LayoutProvider>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {allVideos?.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {
            allVideos.map((video) => (
                <VideoCard
                    key={video?.id}
                    video={video}
                    onDownload={handleDownloadVideo}
                />
            ))
          }
        </div>
      )}
    </div>
  </LayoutProvider>;
};

export default Page;
