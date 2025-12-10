import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ResultsAPI } from "../../api/results";

interface CreateResultModalProps {
  projectId: string;
  subjectId: string;
  onSuccess?: () => void;
}

export const CreateResultModal = ({ projectId, subjectId, onSuccess }: CreateResultModalProps) => {
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Название не может быть пустым");
            return;
        }
        if (!description.trim()) {
            setError("Описание не может быть пустым");
            return;
        }
        if (!deadline) {
            setError("Дедлайн не может быть пустым");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await ResultsAPI.create(description.trim(), title.trim(), subjectId, new Date(deadline));
            setTitle("");
            setDescription("");
            setDeadline("");
            closeModal();
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.message || "Ошибка при создании результата");
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal title="Создать результат">
            <div className="container" style={{ maxWidth: "400px", margin: "20px auto" }}>
                {error && <div className="error-message">{error}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Название результата"
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                    <textarea
                        placeholder="Описание результата"
                        className="input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                        rows={4}
                        style={{ resize: "vertical" }}
                    />
                    <input
                        type="date"
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
