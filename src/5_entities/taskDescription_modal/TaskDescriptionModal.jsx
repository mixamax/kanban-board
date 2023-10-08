import { Modal, Button } from "antd";
import { Badge, Descriptions } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";

// import { UploadOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
const getItemsState = (state) => state.reduserTascs;

export const TaskDescriptionModal = ({
    isModalOpen,
    close,
    taskId,
    projectName,
    openComment,
    chooseActiveTask,
}) => {
    const tasksState = useSelector(getItemsState);
    const [durationDate, setDurationDate] = useState("");

    useLayoutEffect(() => {
        chooseActiveTask(taskId);
    }, [taskId]);

    let priority = "",
        taskTitle = "",
        startDate = "",
        normStartDate,
        endDate = 0,
        normEndDate,
        priorityText = "",
        columnName = "";

    if (taskId) {
        taskTitle = tasksState[projectName].tasks[taskId].taskTitle;
        startDate = tasksState[projectName].tasks[taskId].startDate;
        endDate = tasksState[projectName].tasks[taskId].endDate;
        priority = tasksState[projectName].tasks[taskId].priority;
        columnName = tasksState[projectName].tasks[taskId].columnName;
        normStartDate = new Date(startDate).toLocaleString("ru", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        });

        endDate
            ? (normEndDate = new Date(endDate).toLocaleString("ru", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
              }))
            : (normEndDate = "не завершена");

        if (priority === 1) {
            priorityText = "низкий";
        } else if (priority === 2) {
            priorityText = "средний";
        } else {
            priorityText = "высокий";
        }
    }

    function getDuration() {
        let a = moment(startDate);
        let b = moment(Date.now());
        let days = b.diff(a, "days");
        a.add(days, "days");
        let hours = b.diff(a, "hours");
        a.add(hours, "hours");
        let minutes = b.diff(a, "minutes");
        a.add(minutes, "minutes");
        let seconds = b.diff(a, "seconds");
        let dur = `${days} дн, ${hours} ч, ${minutes} мин, ${seconds}сек`;
        return dur;
    }

    useEffect(() => {
        if (columnName === "Done") {
            let dur = getDuration();
            setDurationDate(dur);
            return;
        }
        let dur = getDuration();
        const timer = setTimeout(setDurationDate, 1000, dur);
        return () => clearTimeout(timer);
    }, [durationDate, columnName]);

    const items = [
        {
            key: "1",
            label: "Описание",
            children: taskTitle,
            // span: 1,
        },
        {
            key: "2",
            label: "Дата создания",
            children: normStartDate,
            // span: 2,
        },
        {
            key: "3",
            label: "Дата окончания",
            children: normEndDate,
            // span: 3,
        },
        {
            key: "4",
            label: <Badge status="processing" text="В работе" />,
            children: durationDate,
        },
        {
            key: "5",
            label: "Подзадачи",
            children: "3",
        },
        {
            key: "6",
            label: "Приоритет",
            children: priorityText,
        },
    ];
    return (
        <Modal
            title={
                taskId === 0
                    ? ""
                    : `${tasksState[projectName].tasks[taskId].taskDescription}`
            }
            centered
            open={isModalOpen}
            // onOk={form.submit}
            onOk={close}
            onCancel={close}
        >
            <Descriptions
                // title="User Info"
                bordered
                items={items}
                column={1}
                size="small"
            />

            <Button size={"m"}>добавить подзадачу</Button>
            <CommentOutlined
                onClick={openComment}
                color="red"
                style={{
                    fontSize: "200%",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                    cursor: "pointer",
                    color: "red",
                }}
            />
        </Modal>
    );
};
