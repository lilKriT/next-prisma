import { prisma } from "@/lib/prisma";

const UserList = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="container bg-gray-600 text-white">
      <h1>Users</h1>
      {users.map((user) => (
        <article key={user.id}>
          <h2>{user.name}</h2>
        </article>
      ))}
    </div>
  );
};

export default UserList;
