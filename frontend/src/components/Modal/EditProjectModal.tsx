import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ProjectsAPI } from "../../api/projects";

export const EditProjectModal = ({ id, title, deadline, onSuccess }: { id: string | number; title: string; deadline?: string; onSuccess: () => void }) => {
    const { closeModal } = useModal();
    const [newTitle, setNewTitle] = useState(title);
    const [newDeadline, setNewDeadline] = useState(deadline || "");

    const submit = async () => {
        try {
            await ProjectsAPI.update(String(id), { 
                title: newTitle,
                deadline: newDeadline ? new Date(newDeadline) : undefined
            });
            closeModal();
            onSuccess();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <BaseModal title="Редактировать проект">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    placeholder="Название проекта"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <button 
                    onClick={submit}
                    style={{ 
                        background: "#007bff", 
                        color: "white", 
                        border: "none", 
                        padding: "10px", 
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Обновить
                </button>
            </div>
        </BaseModal>
    );
};
