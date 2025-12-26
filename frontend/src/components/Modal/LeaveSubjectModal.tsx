import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { SubjectsAPI } from "../../api/subjects";

export const LeaveSubjectModal = ({ 
  subjectTitle,
  subjectId,
  isAdmin,
  onSuccess,
}: { 
  subjectTitle: string;
  subjectId: number;
  isAdmin: boolean;
  onSuccess: () => void;
}) => {
    const { closeModal } = useModal();

    const handleConfirm = async () => {
        await SubjectsAPI.leave(subjectId.toString());
        closeModal();
        onSuccess();
    };

    return (
        <BaseModal title={isAdmin ? "Удалить предмет" : "Выйти из предмета"}>
            {isAdmin ? (
                <div>
                    <p style={{ color: "#dc3545", fontWeight: "bold", marginBottom: "15px" }}>
                        ⚠️ Внимание! Вы администратор этого предмета.
                    </p>
                    <p>
                        Если вы выйдете из предмета, он будет <strong>удалён</strong> вместе со всеми проектами и результатами.
                    </p>
                    <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                        Вы уверены?
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button
                            onClick={handleConfirm}
                            style={{
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Удалить предмет
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Вы выйдете из предмета "{subjectTitle}".</p>
                    <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                        Вы уверены?
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button
                            onClick={handleConfirm}
                            style={{
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            )}
        </BaseModal>
    );
};
