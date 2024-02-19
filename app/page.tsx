import Image from "next/image";
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
    {
      title: "احساسات",
      icon: "/assets/emotions.png",
    },
    {
      title: "حیوان",
      icon: "/assets/animals.png",
    },
    {
      title: "کتاب",
      icon: "/assets/books.png",
    },
    {
      title: "محیط",
      icon: "/assets/environment.png",
    },
    {
      title: "شخصیت",
      icon: "/assets/figures.png",
    },
    {
      title: "شغل",
      icon: "/assets/jobs.png",
    },
    {
      title: "اشیا",
      icon: "/assets/objects.png",
    },
    {
      title: "مکان",
      icon: "/assets/places.png",
    },
    {
      title: "ورزش‌ها",
      icon: "/assets/sports.png",
    },
    {
      title: "انتزاعی",
      icon: "/assets/abstract.png",
    },
    {
      title: "تکنولوژی",
      icon: "/assets/technology.png",
    },
    {
      title: "فعالیت",
      icon: "/assets/activity.png",
    },
    {
      title: "موسیقی",
      icon: "/assets/music.png",
    },
    {
      title: "شهر و کشور",
      icon: "/assets/city-country.png",
    },
    {
      title: " ضرب‌المثل ",
      icon: "/assets/proverb.png",
    },
    {
      title: " کودکان ",
      icon: "/assets/children.png",
    },
  ];
  const data = await getData();

  return (
    <main className="p-5 flex justify-center flex-col text-center gap-16 bg-black h-screen bg-gradient-to-b from-purple-300 to-purple-50">
      <div className="flex flex-col gap-5">
        <h1 className="text-purple-800"> دسته‌بندی خودت رو انتخاب کن </h1>
        <p id="data">{data}</p>
      </div>
      <section className="flex flex-col gap-4 bg-stone-300 rounded-2xl p-4">
        <section className="flex gap-2">
          <button className="bg-gray-50 px-4 shadow-lg py-2.5 rounded-2xl font-medium w-full flex justify-center gap-4 items-center text-sm">
          <Image
            alt="icon image"
            src= "/assets/dice.png"
            width={100}
            height={100}
            className="w-7 h-7"
          />
            <p> تصادفی </p>
          </button>
          <button className="bg-gray-50 px-4 py-2.5 rounded-2xl font-medium w-full flex justify-center gap-4 items-center shadow-[0_10px_15px_-3px_rgba(243,183,29,0.2),0_4px_6px_-4px_rgba(243,183,29,0.2)] border text-sm border-yellow-400">
          <Image
            alt="icon image"
            src= "/assets/golden-cup.png"
            width={100}
            height={100}
            className="w-7 h-7"
          />
            <p> طلایی </p>
          </button>
        </section>
        <section className="flex flex-wrap gap-2  justify-center">
          {categories.map((category, index) => (
            <Modal
              key={index}
              categoryTitle={category.title}
              categoryIcon={category.icon}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
