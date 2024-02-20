import Image from "next/image";
import Modal from "./category/(components)/Modal";
import handleLevelButtonClick from "./category/(components)/Modal";

async function fetchData() {
  const res = await fetch(
    "http://localhost:8000/api/v1/words/word?category=to&level=1",
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const data = await fetchData();
  console.log(data);

  const categories = [
    {
      id: "TE",
      title: "احساسات",
      icon: "/assets/emotions.png",
    },
    {
      id: "TA",
      title: "حیوان",
      icon: "/assets/animals.png",
    },
    {
      id: "TB",
      title: "کتاب",
      icon: "/assets/books.png",
    },
    {
      id: "TEN",
      title: "محیط",
      icon: "/assets/environment.png",
    },
    {
      id: "TF",
      title: "شخصیت",
      icon: "/assets/figures.png",
    },
    {
      id: "TJ",
      title: "شغل",
      icon: "/assets/jobs.png",
    },
    {
      id: "TO",
      title: "اشیا",
      icon: "/assets/objects.png",
    },
    {
      id: "TP",
      title: "مکان",
      icon: "/assets/places.png",
    },
    {
      id: "TS",
      title: "ورزشی",
      icon: "/assets/sports.png",
    },
    {
      id: "TAB",
      title: "انتزاعی",
      icon: "/assets/abstract.png",
    },
    {
      id: "TT",
      title: "تکنولوژی",
      icon: "/assets/technology.png",
    },
    {
      id: "TAC",
      title: "فعالیت",
      icon: "/assets/activity.png",
    },
    {
      id: "TM",
      title: "موسیقی",
      icon: "/assets/music.png",
    },
    {
      id: "TCC",
      title: "شهر و کشور",
      icon: "/assets/city-country.png",
    },
    {
      id: "TPR",
      title: " ضرب‌المثل ",
      icon: "/assets/proverb.png",
    },
    {
      id: "TCR",
      title: " کودکان ",
      icon: "/assets/children.png",
    },
  ];

  return (
    <main className="p-4 flex justify-center flex-col items-center gap-16 h-full py-10">
      <p className="text-white text-xl">{data.data.word}</p>
      <h1>
        <Image
          alt="icon image"
          src="/assets/category.svg"
          width={100}
          height={100}
          className="w-full px-8"
        />
      </h1>
      <section className="flex flex-col gap-4 bg-white/70 rounded-3xl p-4">
        <section className="flex gap-3">
          <button className="bg-gray-50 px-4 shadow-lg py-2.5 rounded-2xl w-full flex justify-center gap-4 items-center hover:scale-105 transition-transform active:translate-y-1">
            <Image
              alt="icon image"
              src="/assets/dice.png"
              width={100}
              height={100}
              className="w-7 h-7"
            />
            <p className="text-sm font-medium lg:text-base"> تصادفی </p>
          </button>
          <button className="bg-gray-50 px-4 py-2.5 rounded-2xl  w-full flex justify-center gap-4 items-center shadow-[0_10px_15px_-3px_rgba(243,183,29,0.2),0_4px_6px_-4px_rgba(243,183,29,0.2)] border border-yellow-400 hover:scale-105 transition-transform active:translate-y-1">
            <Image
              alt="icon image"
              src="/assets/golden-cup.png"
              width={100}
              height={100}
              className="w-7 h-7"
            />
            <p className="text-sm font-medium lg:text-base"> طلایی </p>
          </button>
        </section>
        <section className="grid grid-cols-4 gap-2">
          {categories.map((category, index) => (
            <Modal
              key={index}
              categoryTitle={category.title}
              categoryIcon={category.icon}
              categoryId={category.id}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
