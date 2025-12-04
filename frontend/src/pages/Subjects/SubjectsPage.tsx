import { useEffect, useState } from "react";
import { SubjectsAPI } from "../../api/subjects";
import { Link } from "react-router-dom";
import "../../styles/common.css";

interface Subject { id: number; title: string; }

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    SubjectsAPI.list().then(setSubjects).catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1>Предметы</h1>
      {subjects.map((s) => (
        <div key={s.id} className="card">
          <Link to={`/projects/${s.id}`} className="link">{s.title}</Link>
        </div>
      ))}
    </div>
  );
}
