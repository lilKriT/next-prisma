import { usePrisma } from "@/lib/prisma";
import TaskList from "./TaskList";
import { User } from "@prisma/client";

const UserList = async ({ users }: { users: User[] }) => {
  return (
    <div className="container flex flex-col gap-4">
      {users.length !== 0 ? (
        users.map((user) => (
          <article key={user.id} className="userCard">
            <h2 className="text-xl">{user.name}</h2>
            <TaskList userId={user.id} />
          </article>
        ))
      ) : (
        <p>No users yet</p>
      )}
    </div>
  );
};

export default UserList;
