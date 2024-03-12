import Image from "next/image";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="text-white bg-[#031A30] h-full w-full fixed top-0 z-50 flex flex-col justify-center items-center gap-8">
      <p className="text-7xl font-bold tracking-wider">404</p>
      <Image
        alt="503 image"
        src="/assets/404-error.svg"
        width={100}
        height={100}
        className="w-full px-10 lg:w-56 lg:px-0"
      />
      <div>
        <p className="text-center">اوه نه!</p>
        <p className="text-center">چیزی که دنبالشی گم شده!</p>
        <p className="text-center">لطفا برگرد و بعدا تلاش کن.</p>
      </div>
      <Link href="/">
        <Image
          alt="503 image"
          src="/assets/goBack.svg"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
}

export default NotFoundPage;
