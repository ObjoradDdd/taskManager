import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResultsAPI } from "../../api/results";
import "../../styles/common.css";
import { useModal } from "../../components/Modal/ModalProvider";
import { CreateResultModal } from "../../components/Modal/CreateResultModal";
import { EditResultModal } from "../../components/Modal/EditResultModal";
import { ResultModal } from "../../components/Modal/ResultModal";
import { GanttChart } from "../../components/GanttChart";
import { Result } from "../../types";
import { InviteUserToProjectModal } from "../../components/Modal/InviteUserToProjectModal";

export default function ProjectPage() {
  const { subjectId, projectId } = useParams();
  const { openModal } = useModal();
  const [results, setResults] = useState<Result[]>([]);

  const loadResults = () => {
    if (projectId) ResultsAPI.list(projectId).then(setResults).catch(console.error);
  };

  useEffect(() => {
    loadResults();
  }, [projectId]);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Удалить результат?")) return;
    try {
      await ResultsAPI.delete(String(id));
      loadResults();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container">
      <button onClick={() => openModal(<InviteUserToProjectModal subjectId={subjectId!} />)}>Invite User</button>
      <button onClick={() => openModal(<CreateResultModal subjectId={subjectId!} projectId={projectId!} />)}>Create Result</button>
      <h1>Результаты (Диаграмма Ганта)</h1>
      
      {/* Gantt диаграмма */}
      <div style={{ marginBottom: "40px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "4px", border: "1px solid #dee2e6" }}>
        <h2 style={{ marginTop: 0 }}>Временная шкала</h2>
        <GanttChart results={results} />
      </div>

      <h2>Детальный список</h2>
      {results.map((r) => (
        <div key={r.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2>{r.title}</h2>
              <p>{r.description}</p>
              <p>Дедлайн: {r.dueDate ?? (r as any).deadline}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() =>
                  openModal(<ResultModal result={r} onSuccess={loadResults} />)
                }
                style={{ background: "#17a2b8", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
              >
                Info
              </button>
              <button
                onClick={() =>
                  openModal(<EditResultModal result={r} onSuccess={loadResults} />)
                }
                style={{ background: "#007bff", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                style={{ background: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}