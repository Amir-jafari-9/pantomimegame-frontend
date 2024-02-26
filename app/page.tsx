import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
            <Link
            key={index}
            href={`/category/${category.id}`}
            passHref
            className="bg-gray-50 flex flex-col justify-center items-center h-full w-full p-4 gap-3 shadow-lg rounded-2xl  hover:shadow-2xl  hover:scale-105 transition-transform active:translate-y-1"
          >
            <Image alt="icon image" src={category.icon} width={100} height={100} />
            <p className="text-xs font-medium lg:text-base">{category.title}</p>
          </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
