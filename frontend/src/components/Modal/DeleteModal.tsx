import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";

interface DeleteModalProps {
    itemName: string; // name of the item (project, subject, result)
    itemType: string; // type of the item (Project, Subject, Result)
    onConfirm: () => Promise<void>;
    onSuccess: () => void;
}

export const DeleteModal = ({ itemName, itemType, onConfirm, onSuccess }: DeleteModalProps) => {
    const { closeModal } = useModal();

    const handleConfirm = async () => {
        await onConfirm();
        onSuccess();
        closeModal();
    }

    return (
        <BaseModal title={`Удалить ${itemType}`}>
            <div>
                <p>Вы собираетесь удалить {itemType.toLowerCase()} "{itemName}".</p>
                <p style={{ marginTop: "15px", marginBottom: "15px" }}>Вы уверены?</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button
                        onClick={() => handleConfirm()}
                        style={{
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            padding: "10px 15px",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};
