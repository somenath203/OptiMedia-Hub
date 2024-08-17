/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Image,
  UploadIcon,
  ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";


export const LayoutProvider = ({ children }) => {


  const sidebarItems = [
     { href: "/", icon: LayoutDashboardIcon, label: "All Videos" },
     { href: "/social-share", icon: Image, label: "Image Optimizer" },
     { href: "/video-upload", icon: UploadIcon, label: "Upload Video" },
   ];

      
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const { signOut } = useClerk();

  const { user } = useUser();


  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {

    toast.success('You have been logged out successfully', { 
      duration: 4000,
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    
    await signOut();

  };

  return (
    <div className="drawer lg:drawer-open">

      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="drawer-content flex flex-col">

        <header className="w-full bg-base-200">

          <div className="navbar flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>

            <div className="flex-1">
              <Link href="/" onClick={handleLogoClick}>
                <div className="btn btn-ghost normal-case text-lg lg:text-2xl font-bold tracking-tight cursor-pointer">
                  OptiMedia Hub
                </div>
              </Link>
            </div>
            
            <div className="flex-none flex items-center space-x-4">
              {user && (
                <>
                  <div className="avatar">

                    <div className="w-8 h-8 rounded-full">
                      <img
                        src={user.imageUrl}
                        alt={
                          user.username || user.emailAddresses[0].emailAddress
                        }
                      />
                    </div>

                  </div>

                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle"
                  >
                    <LogOutIcon className="h-6 w-6" />
                  </button>

                </>
              )}
            </div>

          </div>

        </header>



        <main className="flex-grow">

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>

        </main>

      </div>

      {/*  drawer  */}
      <div className="drawer-side">

        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

        <aside className="bg-base-200 w-64 h-full flex flex-col">

          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>


          <ul className="menu p-4 w-full text-base-content flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>


          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}

        </aside>

      </div>

    </div>
  );
}
