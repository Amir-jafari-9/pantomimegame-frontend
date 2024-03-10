export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="fixed inset-0 z-50 bg-black/80">
      <div className="flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%]  sm:rounded-lg w-full h-full">
        <p className="text-white text-8xl">Loading</p>
      </div>
    </div>
  }