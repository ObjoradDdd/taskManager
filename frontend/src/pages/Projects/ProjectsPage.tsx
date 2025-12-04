import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectsAPI } from "../../api/projects";
import "../../styles/common.css";

interface Project { id: number; title: string; deadline: string; status: string; }

export default function ProjectsPage() {
  const { subjectId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (subjectId) ProjectsAPI.list(subjectId).then(setProjects).catch(console.error);
  }, [subjectId]);

  return (
    <div className="container">
      <h1>Проекты</h1>
      {projects.map((p) => (
        <div key={p.id} className="card">
          <Link to={`/project/${p.id}/tasks`} className="link">{p.title}</Link>
          <p>Дедлайн: {p.deadline}</p>
          <p>Статус: {p.status}</p>
        </div>
      ))}
    </div>
  );
}
