
export function VideoSkeleton() {
  return (
    <div className="flex-1 animate-pulse mt-12">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video bg-gray-500 rounded">
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="lg:flex lg:items-start lg:gap-16">
          <div className="flex-1">
            
            <div className="bg-gray-500 rounded-2xl w-full h-5" />
            <div className="mt-6 bg-gray-500 rounded-2xl w-4/5 h-3" />
            <div className="mt-2 bg-gray-500 rounded-2xl w-4/5 h-3" />
            <div className="mt-2 bg-gray-500 rounded-2xl w-3/4 h-3" />
            
            <div className="flex items-center gap-4 mt-10">
              <div className="h-16 w-16 rounded-full bg-gray-500"  />
              
            
              <div className="w-full ">
                <div className="bg-gray-500 rounded-2xl w-2/5 h-4" />
                <div className="mt-6 bg-gray-500 rounded-2xl w-3/4 h-2" />
                <div className="mt-2 bg-gray-500 rounded-2xl w-3/4 h-2" />
              </div>
          
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8 lg:mt-0 w-48">
            <div className="bg-gray-500 rounded-3xl w-full h-14" />
            <div className="bg-gray-500 rounded-3xl w-full h-14" />
          </div>
        </div>
      </div>
    </div>
  );
}
