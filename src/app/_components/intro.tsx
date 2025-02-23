import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <Link href="/" className="hover:underline">
        <h1 className="text-base md:text-base font-bold font-comfortaa tracking-tighter leading-tight md:pr-8">
          dimafeng.com
        </h1>
      </Link>
      {/* <h1 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Engineering Leadership Notes
      </h1> */}
    </section>
  );
}
