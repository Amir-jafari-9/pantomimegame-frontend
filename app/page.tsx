import Modal from "./category/(components)/Modal";

async function getData() {
  const res = await fetch("https://random-word-api.herokuapp.com/word");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


export default async function Page() {
  const categories = [
    "احساسات",
    "شخصیت",
    "مکان",
    "شغل",
    "حیوان",
    "غذا",
    "فعالیت",
    "اشیا",
  ];
  const data = await getData();

  return (
    <main className="p-5 flex justify-center flex-col text-center gap-16 bg-black h-screen bg-gradient-to-b from-purple-300 to-purple-50">
      <div className="flex flex-col gap-5">
        <h1 className="text-purple-800"> دسته‌بندی خودت رو انتخاب کن </h1>
        <p id="data">{data}</p>
        <button className="bg-white border-2 border-purple-800 text-purple-800 p-4 py-2.5 rounded-xl font-semibold">
          انتخاب تصادفی
        </button>
      </div>
      <section className="flex flex-wrap gap-4 justify-center">
        {categories.map((category, index) => (
          <Modal key={index} category={category} />
        ))}
      </section>
    </main>
  );
}
