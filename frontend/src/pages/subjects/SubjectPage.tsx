import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectsAPI } from "../../api/projects";
import "../../styles/common.css";
import { useModal } from "../../components/Modal/ModalProvider";
import { InviteUserToSubjectModal } from "../../components/Modal/InviteUserToSubjectModal";
import { CreateProjectModal } from "../../components/Modal/CreateProjectModal";
import { EditProjectModal } from "../../components/Modal/EditProjectModal";
import { LeaveProjectModal } from "../../components/Modal/LeaveProjectModal";

interface Project { id: number; title: string; deadline: string;}


export default function SubjectPage() {
  const { subjectId } = useParams();
  const { openModal } = useModal();
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    ProjectsAPI.list(subjectId!)
      .then((res) => {
        setProjects(res.projects ?? []);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить проект?")) return;
    try {
      await ProjectsAPI.delete(String(id));
      loadProjects();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container">
      <button onClick={() => openModal(<InviteUserToSubjectModal subjectId={subjectId!} />)}>Invite User</button>
      <button onClick={() => openModal(<CreateProjectModal subjectId={subjectId!} onSuccess={loadProjects} />)}>Create Project</button>
      <h1>Проекты</h1>
      {projects.map((p) => (
        <div key={p.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Link to={`/subjects/${subjectId}/projects/${p.id}`}>{p.title}</Link>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() =>
                  openModal(<LeaveProjectModal projectTitle={p.title} projectId={p.id} onSuccess={loadProjects} />)
                }
                style={{ background: "#4dff00ff", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
              >
                Leave
              </button>
              <button
                onClick={() =>
                  openModal(<EditProjectModal id={p.id} title={p.title} onSuccess={loadProjects} />)
                }
                style={{ background: "#007bff", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
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