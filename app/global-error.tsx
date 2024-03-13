"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col justify-center items-center gap-4 text-xl font-semibold h-screen ">
          <h2> یه چیزی خراب شد! </h2>
          <button
            className="border border-black p-4 rounded-md"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            امتحان دوباره
          </button>
        </div>
      </body>
    </html>
  );
}
