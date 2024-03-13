'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col justify-center items-center gap-4 text-xl font-semibold h-screen text-white'>
      <h2>  یه چیزی خراب شد! </h2>
      <button
      className='border border-black p-4 rounded-md'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        امتحان دوباره
      </button>
    </div>
  )
}