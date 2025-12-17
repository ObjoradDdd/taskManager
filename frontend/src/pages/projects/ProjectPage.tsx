import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResultsAPI } from "../../api/results";
import "../../styles/common.css";
import { useModal } from "../../components/Modal/ModalProvider";
import { CreateResultModal } from "../../components/Modal/CreateResultModal";
import { EditResultModal } from "../../components/Modal/EditResultModal";
import { ResultModal } from "../../components/Modal/ResultModal";
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

  const handleDelete = async (id: number | string) => {
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
      <button onClick={() => openModal(<InviteUserToProjectModal projectId={projectId!} />)}>Invite User</button>
      <button onClick={() => openModal(<CreateResultModal projectId={projectId!} onSuccess={loadResults} />)}>Create Result</button>
      <h1>Результаты</h1>
      {results.map((r) => (
        <div key={r.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <h3 style={{ marginTop: 0, cursor: "pointer", color: "#007bff" }} onClick={() => openModal(<ResultModal result={r} onSuccess={loadResults} />)}>
                  {r.title}
                </h3>
                <span style={{ fontSize: "12px", color: "#999", fontWeight: "normal" }}>(ID: {r.id})</span>
              </div>
              <p style={{ color: "#666", marginBottom: "5px" }}>{r.description}</p>
              <p style={{ marginBottom: "0" }}>Дедлайн: {r.deadline ? new Date(r.deadline).toLocaleDateString("ru-RU") : "Не указан"}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
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