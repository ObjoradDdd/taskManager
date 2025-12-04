import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksAPI } from "../../api/tasks";
import "../../styles/common.css";

interface Task { id: number; title: string; description: string; deadline: string; status: string; }

export default function TasksPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (projectId) TasksAPI.list(projectId).then(setTasks).catch(console.error);
  }, [projectId]);

  return (
    <div className="container">
      <h1>Задачи</h1>
      {tasks.map((t) => (
        <div key={t.id} className="card">
          <h2>{t.title}</h2>
          <p>{t.description}</p>
          <p>Дедлайн: {t.deadline}</p>
          <p>Статус: {t.status}</p>
        </div>
      ))}
    </div>
  );
}
