import Menu from "../../../components/Menu";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * DashboardLayout component is a layout wrapper for the teacher's dashboard.
 * It structures the page into a left sidebar and a main content area.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed within the main content area.
 *
 * @returns {JSX.Element} The rendered dashboard layout component.
 *
 * @component
 * @example
 * return (
 *   <DashboardLayout>
 *     <YourComponent />
 *   </DashboardLayout>
 * )
 */

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">SchooLama</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}