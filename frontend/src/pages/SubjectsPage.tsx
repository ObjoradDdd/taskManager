import { useEffect, useState } from "react";

interface Subject {
  id: number;
  title: string;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetch("/api/subjects")
      .then((r) => r.json())
      .then(setSubjects);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Предметы</h1>
      <ul>
        {subjects.map((s) => (
          <li key={s.id} className="mb-2">
            <a href={`/projects/${s.id}`} className="text-blue-600">
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
