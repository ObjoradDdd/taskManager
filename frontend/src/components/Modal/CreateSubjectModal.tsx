import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { SubjectsAPI } from "../../api/subjects";


interface CreateSubjectModalProps {
  onSuccess?: () => void; // колбэк после успешного создания
}

export const CreateSubjectModal = ({ onSuccess }: CreateSubjectModalProps) => {
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Название не может быть пустым");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await SubjectsAPI.create(title.trim());
      setTitle("");
      closeModal();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Ошибка при создании предмета");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal title="Создать предмет">
      <div className="container" style={{ maxWidth: "400px", margin: "20px auto" }}>
        {error && <div className="error-message">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Название предмета"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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