
"use client";

import {
  GlobalError,
  Field,
  FieldError,
  Label,
  Input,
} from "@clerk/elements/common";
import { Root, Step, Action } from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * LoginPage component renders a sign-in page for users.
 * 
 * This component uses the Clerk library for handling user authentication.
 * It redirects users to a specific route based on their role after successful sign-in.
 * 
 * @component
 * @returns {JSX.Element} The rendered sign-in page.
 * 
 * @example
 * // Usage
 * <LoginPage />
 * 
 * @remarks
 * - The component uses `useUser` hook to get user information and authentication status.
 * - The `useEffect` hook is used to redirect the user based on their role.
 * - The sign-in form includes fields for username and password, with validation and error handling.
 * - The form is styled using Tailwind CSS classes.
 * 
 * @dependencies
 * - `useUser` from Clerk for user authentication.
 * - `useRouter` from Next.js for navigation.
 * - `SignIn` components from Clerk for rendering the sign-in form.
 * - `Image` from Next.js for displaying the logo.
 */

const LoginPage = () => {
  const { isSignedIn, user } = useUser(); // Extract user information and authentication status
  const router = useRouter(); // Next.js router for navigation

  /**
   * Redirect the user based on their role.
   * If the user is signed in and has a defined role, navigate to the corresponding route.
   */
  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.publicMetadata?.role; // Fetch user role from metadata
      if (role) {
        router.push(`/${role}`); // Redirect to the role-specific route
      } else {
        console.warn("User role is undefined"); // Log a warning if role is missing
      }
    }
  }, [isSignedIn, user, router]);

  // Display a loading message if the user is not signed in
  if (!isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <Root>
        <Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          <GlobalError className="text-sm text-red-400" />
          <Field name="identifier" className="flex flex-col gap-2">
            <Label className="text-xs text-gray-500">Username</Label>
            <Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
              aria-label="Enter your username"
            />
            <FieldError className="text-xs text-red-400" />
          </Field>
          <Field name="password" className="flex flex-col gap-2">
            <Label className="text-xs text-gray-500">Password</Label>
            <Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
              aria-label="Enter your password"
            />
            <FieldError className="text-xs text-red-400" />
          </Field>
          <Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </Action>
        </Step>
      </Root>
    </div>
  );
};

export default LoginPage;
