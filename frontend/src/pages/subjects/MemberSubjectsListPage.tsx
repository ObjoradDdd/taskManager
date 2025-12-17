import { useEffect, useState } from "react";
import { SubjectsAPI } from "../../api/subjects";
import { Link } from "react-router-dom";
import "../../styles/common.css";
import { CreateSubjectModal } from "../../components/Modal/CreateSubjectModal";
import { EditSubjectModal } from "../../components/Modal/EditSubjectModal";
import { useModal } from "../../components/Modal/ModalProvider";
import { LeaveSubjectModal } from "../../components/Modal/LeaveSubjectModal";


interface Subject { id: number; title: string; role?: string; }


export default function MemberSubjectsListPage() {
    const { openModal } = useModal();
    const [subjects, setSubjects] = useState<Subject[]>([]);


    const loadSubjects = () => {
        SubjectsAPI.listMember()
            .then((res) => {
                setSubjects(res.subjects ?? []);
            })
            .catch(console.error);
    };

    useEffect(() => {
        loadSubjects();
    }, []);

    return (
        <div className="container">
            <h1>Предметы</h1>
            {subjects.map((s) => (
                <div key={s.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Link to={`/subjects/${s.id}`}>{s.title}</Link>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={() =>
                                    openModal(<LeaveSubjectModal subjectTitle={s.title} isAdmin={false} subjectId={s.id} onSuccess={loadSubjects} />)
                                }
                                style={{ background: "#4dff00ff", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                            >
                                Leave
                            </button>

                            <button
                                onClick={() =>
                                    openModal(<EditSubjectModal id={s.id} title={s.title} onSuccess={loadSubjects} />)
                                }
                                style={{ background: "#007bff", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                            >
                                Edit
                            </button>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
