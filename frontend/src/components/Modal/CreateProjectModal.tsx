import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ProjectsAPI } from "../../api/projects";

interface CreateProjectModalProps {
  subjectId: string;
  onSuccess?: () => void;
}

export const CreateProjectModal = ({ subjectId, onSuccess }: CreateProjectModalProps) =>{
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Название не может быть пустым");
            return;
        }
        if (!deadline) {
            setError("Дедлайн не может быть пустым");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await ProjectsAPI.create(title.trim(), subjectId, new Date(deadline));
            setTitle("");
            setDeadline("");
            closeModal();
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.message || "Ошибка при создании проекта");
        } finally {
            setLoading(false);
        }
    };


    return (
        <BaseModal title="Создать проект">
            <div className="container" style={{ maxWidth: "400px", margin: "20px auto" }}>
                {error && <div className="error-message">{error}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Название проекта"
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="date"
                        placeholder="Дедлайн"
                        className="input"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        disabled={loading}
                    />
                    <button className="btn btn-primary" disabled={loading}>
                        {loading ? "Создание..." : "Создать"}
                    </button>
                </form>
            </div>
        </BaseModal>
    );
};