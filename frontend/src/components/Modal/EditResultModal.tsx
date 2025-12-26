import { useState, useEffect } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ResultsAPI } from "../../api/results";
import { Result } from "../../types";
import { formatDateDMY } from "../../utils/date";

interface EditResultModalProps {
  result: Result;
  onSuccess: () => void;
}

export const EditResultModal = ({ result, onSuccess }: EditResultModalProps) => {
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
            await ResultsAPI.update(String(result.id), {
                title: title.trim(),
                description: description.trim(),
                deadline: new Date(deadline)
            });
            closeModal();
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Ошибка при редактировании результата");
        } finally {
            setLoading(false);
        }
    };

    const formatDateForInput = (d: Date) => {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        setTitle(result.title || "");
        setDescription(result.description || "");
        result.deadline ? setDeadline(formatDateForInput(new Date(result.deadline))) : setDeadline("");
    }, [result]);

    return (
        <BaseModal title="Редактировать результат">
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
                        {loading ? "Обновление..." : "Обновить"}
                    </button>
                </form>
            </div>
        </BaseModal>
    );
};
