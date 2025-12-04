import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  deadline: string;
  status: string;
}

export default function ProjectsPage() {
  const { subjectId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`/api/subjects/${subjectId}/projects`)
      .then((r) => r.json())
      .then(setProjects);
  }, [subjectId]);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Проекты</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id} className="border p-3 mb-2 rounded">
            <a href={`/project/${p.id}/tasks`} className="text-lg">
              {p.title}
            </a>
            <div>Дедлайн: {p.deadline}</div>
            <div>Статус: {p.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
