import { prisma } from "@/lib/prisma";
import TaskForm from "./components/TaskForm";
import UserList from "./components/UserList";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="container">
      <h1 className="text-4xl text-center  mb-8 ">
        Current{" "}
        <span className="gradientText font-bold tracking-widest">goals</span>:
      </h1>
      <UserList users={users} />
      <TaskForm users={users} />
    </div>
  );
}
