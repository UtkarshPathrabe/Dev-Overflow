import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps, URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: URLProps): Promise<Metadata> {
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });
  return {
    title: `Edit ${mongoUser.name} Profile | Dev Overflow`,
    description: `Edit ${mongoUser.name}'s profile on Dev Overflow - A community-driven platform for asking and answering programming questions. Get help, share knowledge and collaborate with developers from around the world. Explore topics in web developments, mobile app development, algorithms, data structures and more...`,
  };
}

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default Page;
