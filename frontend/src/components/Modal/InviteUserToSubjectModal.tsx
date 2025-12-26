import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { SubjectsAPI } from "../../api/subjects";

export const InviteUserToSubjectModal = ({ subjectId }: { subjectId: string }) => {
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

    const submit = async () => {
        if (emails.length === 0) {
            setError("Добавьте хотя бы один email");
            return;
        }

        try {
            const response = await SubjectsAPI.addUsers(subjectId, emails);

            if (response.wrongEmails && response.wrongEmails.length > 0) {
                setEmails(response.wrongEmails)
                setError("Не удалось добавить:\n" + response.wrongEmails.join("\n"));
                return;
            }

            closeModal();
        } catch {
            setError("Ошибка при приглашении студентов");
        }
    };

    return (
        <BaseModal title="Добавить студентов">
            <div style={{
                maxWidth: "420px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                {error && (
                    <div style={{
                        background: "#fdecea",
                        color: "#b42318",
                        padding: "8px",
                        borderRadius: "4px",
                        fontSize: "13px"
                    }}>
                        {error}
                    </div>
                )}

                <h4 style={{ margin: "6px 0 4px" }}>Добавить email</h4>

                <div style={{ display: "flex", gap: "6px" }}>
                    <input
                        placeholder="student@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addEmail()}
                        style={{
                            flex: 1,
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <button
                        onClick={addEmail}
                        style={{
                            padding: "8px 12px",
                            background: "#6c757d",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Add
                    </button>
                </div>

                <h4 style={{ margin: "8px 0 4px" }}>Загрузить JSON</h4>
                <input type="file" accept=".json" />

                <h4 style={{ margin: "8px 0 4px" }}>
                    Добавленные студенты ({emails.length})
                </h4>

                <div style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "6px"
                }}>
                    {emails.length === 0 ? (
                        <p style={{ color: "#999", fontSize: "13px" }}>
                            Список пуст
                        </p>
                    ) : (
                        emails.map(e => (
                            <div
                                key={e}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "6px",
                                    borderBottom: "1px solid #eee"
                                }}
                            >
                                <span>{e}</span>
                                <button
                                    onClick={() => removeEmail(e)}
                                    style={{
                                        background: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        padding: "4px 8px",
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
                        width: "100%",
                        padding: "10px",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: 500
                    }}
                >
                    Invite All ({emails.length})
                </button>
            </div>
        </BaseModal>
    );
};
