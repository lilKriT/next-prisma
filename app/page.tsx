import UserList from "./components/UserList";

export default function Home() {
  return (
    <div className="container">
      <h1>Using Prisma.</h1>
      <UserList />
    </div>
  );
}
