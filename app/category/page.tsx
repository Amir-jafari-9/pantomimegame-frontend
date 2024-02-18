import Modal from "./(components)/Modal";

const Page = () => {
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

  return (
    <main className="p-5 flex justify-center flex-col text-center gap-16 bg-black h-screen bg-gradient-to-b from-purple-300 to-purple-50">
      <div className="flex flex-col gap-5">
        <h1 className="text-purple-800"> دسته‌بندی خودت رو انتخاب کن </h1>
        <p></p>
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
};

export default Page;
