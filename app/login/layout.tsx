import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In!",
  description: "A task list Created by lilKriT using Next.js and Prisma.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
