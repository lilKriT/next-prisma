import { usePrisma } from "@/lib/prisma";
import TaskList from "./TaskList";
import { User } from "@prisma/client";
import ManageUser from "./ManageUser";

const UserList = async ({ users }: { users: User[] }) => {
  return (
    <div className="container flex flex-col gap-4">
      {users.length !== 0 ? (
        users.map((user) => (
          <article key={user.id} className="userCard">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{user.name}</h2>
              <ManageUser userId={user.id} />
            </div>
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
