import { useState } from "react";
import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { SubjectsAPI } from "../../api/subjects";

export const EditSubjectModal = ({ id, title, onSuccess }: { id: string | number; title: string; onSuccess: () => void }) => {
    const { closeModal } = useModal();
    const [newTitle, setNewTitle] = useState(title);

    const submit = async () => {
        try {
            await SubjectsAPI.update(String(id), { title: newTitle });
            closeModal();
            onSuccess();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <BaseModal title="Edit Subject">
            <input
                placeholder="Subject name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={submit}>Update</button>
        </BaseModal>
    );
};
