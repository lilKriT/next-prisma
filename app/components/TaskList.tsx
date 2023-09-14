import { prisma } from "@/lib/prisma";

const TaskList = async ({ userId }: { userId: number }) => {
  const tasks = await prisma.task.findMany({ where: { userId } });
  return (
    <div className="ml-2">
      <div className="flex flex-col gap-2 mt-4">
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <div className="taskCard" key={task.id}>
              {task.title}
            </div>
          ))
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
