
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useVideos } from '@/hooks/useVideos';

export const VideoSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { videos, loading } = useVideos();
  
  if (loading || videos.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#A21C1C]">
          CONHEÇA MAIS SOBRE NÓS
        </h2>
        
        <p className="text-center text-lg text-[#1F2937] mb-12 max-w-3xl mx-auto">
          Veja como o Mais Delivery está transformando o mercado de entregas
        </p>
        
        <div 
          ref={ref} 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {videos.map((video) => (
            <div key={video.id} className="shadow-lg rounded-lg overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <iframe 
                  src={video.video_url} 
                  title={video.title}
                  className="w-full h-full" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
