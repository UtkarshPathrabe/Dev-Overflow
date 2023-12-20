import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Dev Overflow",
};

export default function Page() {
  return <SignUp />;
}
