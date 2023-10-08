import { Content } from "antd/es/layout/layout";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./TaskPage.module.css";
import { TasksContainer } from "../../5_entities";
import { TaskModal } from "../../5_entities";
import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskDescriptionModal } from "../../5_entities/taskDescription_modal/TaskDescriptionModal";
import { RollbackOutlined } from "@ant-design/icons";
import { CommentModal } from "../../5_entities/comment_modal/CommentModal";

const TasksPage = () => {
    const { projectName } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [taskDescriptionModalOpen, setTaskDescriptionModalOpen] =
        useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const taskIdRef = useRef(0);

    const chooseActiveTask = (value) => {
        setSelectedTaskId(value);
    };

    const setClose = () => {
        setModalOpen(false);
    };
    const closeComment = () => {
        setCommentOpen(false);
    };
    const openComment = () => {
        setCommentOpen(true);
    };
    const setCloseTaskDescriptionModal = () => {
        setTaskDescriptionModalOpen(false);
    };
    const setOpenTaskDescriptionModal = (taskId) => {
        taskIdRef.current = taskId;
        setTaskDescriptionModalOpen(true);
    };

    return (
        <Content
            style={{
                height: "100%",
                minHeight: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            <Link to="/">
                <RollbackOutlined
                    height={"10em"}
                    style={{
                        position: "absolute",
                        left: "2.5rem",
                        top: "2.5rem",
                        fontSize: "200%",
                    }}
                />
            </Link>

            <Button
                onClick={() => setModalOpen(true)}
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                style={{
                    marginTop: "2rem",
                    boxShadow: "0px 0px 20px 2px rgba(0, 0, 0, .35)",
                    backgroundColor: "green",
                }}
            ></Button>
            <div className={styles["names-cont-tasks-column"]}>
                <span className={styles["name-tasks-column"]}>Queue</span>
                <span className={styles["name-tasks-column"]}>Development</span>
                <span className={styles["name-tasks-column"]}>Done</span>
            </div>
            <TasksContainer
                projectName={projectName}
                setOpenTaskDescriptionModal={setOpenTaskDescriptionModal}
            />
            <TaskModal
                isModalOpen={modalOpen}
                close={setClose}
                projectName={projectName}
            />
            <TaskDescriptionModal
                isModalOpen={taskDescriptionModalOpen}
                close={setCloseTaskDescriptionModal}
                // setOpenTaskDescriptionModal={setOpenTaskDescriptionModal}
                taskId={taskIdRef.current}
                projectName={projectName}
                openComment={openComment}
                chooseActiveTask={chooseActiveTask}
            />
            <CommentModal
                isCommentOpen={commentOpen}
                closeComment={closeComment}
                openComment={openComment}
                selectedTaskId={selectedTaskId}

                // taskId={taskIdRef.current}
            />
        </Content>
    );
};

export default TasksPage;
