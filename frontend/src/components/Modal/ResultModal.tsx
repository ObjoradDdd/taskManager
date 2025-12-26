import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ResultsAPI } from "../../api/results";
import { Result } from "../../types";

interface ResultModalProps {
  result: Result;
  onSuccess: () => void;
}

export const ResultModal = ({ result, onSuccess }: ResultModalProps) => {
    const { closeModal } = useModal();
    const [status, setStatus] = useState(result.status || "CREATED");
    const [selectedDependency, setSelectedDependency] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChangeStatus = async (newStatus: string) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await ResultsAPI.changeStatus(String(result.id), { status: newStatus });
            setStatus(newStatus);
            setMessage("Статус успешно изменён");
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Ошибка при изменении статуса");
        } finally {
            setLoading(false);
        }
    };

    const handleAddDependency = async () => {
        if (!selectedDependency) {
            setError("Выберите результат");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            await ResultsAPI.addCodependent(String(result.id), selectedDependency);
            setSelectedDependency("");
            setMessage("Зависимость добавлена");
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Ошибка при добавлении зависимости");
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await ResultsAPI.assign(String(result.id));
            setMessage("Вы ответственны за результат");
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Ошибка");
        } finally {
            setLoading(false);
        }
    };

    const handleUnassign = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await ResultsAPI.unassign(String(result.id));
            setMessage("Вы больше не ответственны за результат");
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Ошибка");
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal title={`Результат: ${result.title}`}>
            <div className="container" style={{ maxWidth: "500px", margin: "20px auto" }}>
                {error && <div className="error-message" style={{ marginBottom: "10px" }}>{error}</div>}
                {message && <div style={{ color: "#28a745", marginBottom: "10px", fontWeight: "bold" }}>{message}</div>}

                {/* Смена статуса */}
                <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <h3 style={{ marginTop: 0 }}>Статус результата</h3>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                            onClick={() => handleChangeStatus("IN_PROGRESS")}
                            disabled={loading}
                            style={{
                                background: status === "IN_PROGRESS" ? "#ffc107" : "#6c757d",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            IN_PROGRESS
                        </button>
                        <button
                            onClick={() => handleChangeStatus("COMPLETED")}
                            disabled={loading}
                            style={{
                                background: status === "COMPLETED" ? "#28a745" : "#6c757d",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            COMPLETED
                        </button>
                        <button
                            onClick={() => handleChangeStatus("CREATED")}
                            disabled={loading}
                            style={{
                                background: status === "CREATED" ? "#3540dcff" : "#6c757d",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            CREATED
                        </button>
                    </div>
                </div>




                <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <h3 style={{ marginTop: 0 }}>Зависимости</h3>
                    
                    <div style={{ marginTop: "10px" }}>
                        <input
                            type="text"
                            placeholder="ID результата для добавления"
                            value={selectedDependency}
                            onChange={(e) => setSelectedDependency(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                marginBottom: "10px",
                                boxSizing: "border-box"
                            }}
                            disabled={loading}
                        />
                        <button
                            onClick={handleAddDependency}
                            disabled={loading}
                            style={{
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                width: "100%"
                            }}
                        >
                            {loading ? "Добавление..." : "Добавить зависимость"}
                        </button>
                    </div>
                </div>


                <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <h3 style={{ marginTop: 0 }}>Назначение</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={handleAssign}
                            disabled={loading}
                            style={{
                                background: "#28a745",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                flex: 1,
                                fontSize: "14px"
                            }}
                        >
                            {loading ? "Делаем вас ответственным..." : "Стать ответственным"}
                        </button>
                        <button
                            onClick={handleUnassign}
                            disabled={loading}
                            style={{
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                flex: 1,
                                fontSize: "14px"
                            }}
                        >
                            {loading ? "Отказываемся..." : "Отказаться"}
                        </button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};
