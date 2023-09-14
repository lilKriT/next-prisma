import { prisma } from "@/lib/prisma";
import TaskCard from "./TaskCard";

const TaskList = async ({ userId }: { userId: number }) => {
  const tasks = await prisma.task.findMany({ where: { userId } });

  const deleteTask = async () => {
    console.log("Deleting");
  };

  return (
    <div className="ml-2">
      <div className="flex flex-col gap-2 mt-4">
        {tasks.length !== 0 ? (
          tasks.map((task) => <TaskCard task={task} key={task.id} />)
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
