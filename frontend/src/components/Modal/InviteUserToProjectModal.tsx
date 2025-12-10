import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ProjectsAPI } from "../../api/projects";

export const InviteUserToProjectModal = ({ subjectId }: { subjectId: string }) => {
    const { closeModal } = useModal();
    const [email, setEmail] = useState("");
    const [emails, setEmails] = useState<string[]>([]);
    const [error, setError] = useState("");

    const addEmail = () => {
        if (!email.trim()) return;
        if (emails.includes(email.trim())) {
            setError("Email уже добавлен");
            return;
        }
        setEmails([...emails, email.trim()]);
        setEmail("");
        setError("");
    };

    const removeEmail = (emailToRemove: string) => {
        setEmails(emails.filter(e => e !== emailToRemove));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const data = JSON.parse(text);
                
                let loadedEmails: string[] = [];
                if (Array.isArray(data)) {
                    // Если это массив
                    loadedEmails = data.filter(item => typeof item === 'string');
                } else if (data.emails && Array.isArray(data.emails)) {
                    // Если это объект с property emails
                    loadedEmails = data.emails.filter((item: any) => typeof item === 'string');
                } else if (typeof data === 'object') {
                    // Если это объект, собрать все значения которые выглядят как emails
                    loadedEmails = Object.values(data).filter(
                        (item: any) => typeof item === 'string' && item.includes('@')
                    ) as string[];
                }

                // Объединить с существующими, убрать дубликаты
                const combined = new Set([...emails, ...loadedEmails]);
                setEmails(Array.from(combined));
                setError("");
            } catch (err) {
                setError("Ошибка при чтении файла. Убедитесь что это валидный JSON.");
            }
        };
        reader.readAsText(file);
    };

    const submit = async () => {
        if (emails.length === 0) {
            setError("Добавьте хотя бы один email");
            return;
        }

        try {
            await ProjectsAPI.addUsers(subjectId, emails);
            closeModal();
        } catch (err) {
            setError("Ошибка при приглашении студентов");
        }
    };

    return (
        <BaseModal title="Добавить студентов в проект">
            {error && <div style={{ color: "#dc3545", marginBottom: "10px" }}>{error}</div>}
            
            <div style={{ marginBottom: "15px" }}>
                <h4>Добавить email вручную:</h4>
                <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
                    <input
                        placeholder="student@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                    />
                    <button onClick={addEmail}>Add</button>
                </div>

                <h4>Загрузить JSON файл:</h4>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    style={{ marginBottom: "10px" }}
                />
                <p style={{ fontSize: "12px", color: "#666" }}>
                    JSON может быть: массив строк ["email1@.com", "email2@.com"] или объект с свойством emails
                </p>
            </div>

            <h4>Добавленные студенты ({emails.length}):</h4>
            <div style={{ 
                maxHeight: "200px", 
                overflowY: "auto", 
                marginBottom: "15px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "4px"
            }}>
                {emails.length === 0 ? (
                    <p style={{ color: "#999" }}>Нет добавленных студентов</p>
                ) : (
                    emails.map((e, idx) => (
                        <div key={idx} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px",
                            borderBottom: "1px solid #eee"
                        }}>
                            <span>{e}</span>
                            <button
                                onClick={() => removeEmail(e)}
                                style={{
                                    background: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    padding: "3px 8px",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            <button 
                onClick={submit}
                style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%"
                }}
            >
                Invite All ({emails.length})
            </button>
        </BaseModal>
    );
};