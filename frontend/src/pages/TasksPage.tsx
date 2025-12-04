import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export default function TasksPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/tasks`)
      .then((r) => r.json())
      .then(setTasks);
  }, [projectId]);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Задачи</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} className="border p-3 mb-2 rounded">
            <div className="text-lg">{t.title}</div>
            <div>{t.description}</div>
            <div>Дедлайн: {t.deadline}</div>
            <div>Статус: {t.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
