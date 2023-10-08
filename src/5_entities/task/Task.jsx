import styles from "./task.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({
    id,
    title,
    start,
    activeId,
    priority,
    endDate,
    setOpenTaskDescriptionModal,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const normDateOfStart = new Date(start).toLocaleString("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    let normDateofEnd;
    if (!!endDate) {
        normDateofEnd = new Date(endDate).toLocaleString("ru", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    }
    const display = id === activeId ? true : false;
    function setColor(priority) {
        if (priority === 1) {
            return "rgb(211,254,171)";
        } else if (priority === 2) {
            return "rgb(248,251,167)";
        } else if (priority === 3) {
            return "rgb(235, 13, 13, 0.4)";
        } else {
            return "rgba(220, 216, 216, 0.6)";
        }
    }

    return (
        <div>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                // hidden
            >
                <div
                    onClick={setOpenTaskDescriptionModal}
                    className={`${styles["task-cont"]}`}
                    hidden={display}
                    style={{ backgroundColor: setColor(priority) }}
                >
                    <span className={styles["task-title"]}>{title}</span>

                    <span
                        className={styles["task-start"]}
                    >{`начата: ${normDateOfStart}`}</span>
                    <span className={styles["task-start"]}>
                        {!!endDate
                            ? `завершена: ${normDateofEnd}`
                            : `не завершена`}
                    </span>
                </div>
            </div>
            <div
                style={{
                    zIndex: "1",
                    width: "5rem",
                    background: "grey",
                    height: "1.4rem",
                    clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
                    paddingLeft: "0.2rem",
                    color: "white",
                    cursor: "pointer",
                }}
                onClick={() => setOpenTaskDescriptionModal(id)}
            >
                открыть
            </div>
        </div>
    );
};
