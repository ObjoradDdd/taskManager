import { useModal } from "./ModalProvider";
import { BaseModal } from "./BaseModal";
import { ProjectsAPI } from "../../api/projects";

export const LeaveProjectModal = ({
  projectTitle,
  projectId,
  onSuccess,
}: { 
  projectTitle: string;
  projectId: number;
  onSuccess: () => void;
}) => {
    const { closeModal } = useModal();

    const handleConfirm = () => {
        ProjectsAPI.leave(projectId.toString());
        closeModal();
        onSuccess();
    };

    return (
        <BaseModal title={"Выйти из проекта"}>
                <div>
                    <p>Вы выйдете из проекта "{projectTitle}".</p>
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
        </BaseModal>
    );
};
