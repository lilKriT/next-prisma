import TaskForm from "./components/TaskForm";
import UserList from "./components/UserList";

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-4xl text-center  mb-8 ">
        Current{" "}
        <span className="gradientText font-bold tracking-widest">goals</span>:
      </h1>
      <UserList />
      <TaskForm />
    </div>
  );
}
