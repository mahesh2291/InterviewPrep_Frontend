const Skeleton=()=>{
    return (
        <div className="bg-base-200 text-base-content p-6 rounded-lg space-y-4 max-h-[100vh] overflow-y-auto">
      <div className="h-6 w-3/4 bg-base-300 rounded"></div>

      {Array.from({ length: 15 }).map((_, idx) => (
        <div key={idx} className="space-y-2">
         
          <div className="h-4 w-full bg-base-300 rounded"></div>
          <div className="h-4 w-5/6 bg-base-300 rounded"></div>
        </div>
      ))}
    </div>
    )
}

export default Skeleton