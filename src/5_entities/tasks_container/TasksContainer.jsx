import styles from "./tasksContainer.module.css";
import { Task } from "../task/Task";
import { useState } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";

// import { v4 as uuidv4 } from "uuid";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
    useDroppable,
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";

// const idv4 = `item-${uuidv4()}`;
const getItemsState = (state) => state.reduserTascs;

export const TasksContainer = ({
    projectName,
    setOpenTaskDescriptionModal,
}) => {
    const itemsState = useSelector(getItemsState);
    const items = itemsState[projectName];

    const [activeId, setActiveId] = useState(null);

    const updateTasks = useDispatch();

    const sensors = useSensors(
        useSensor(TouchSensor, {
            // Press delay of 250ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function findNameOfColumn(nameOfTask) {
        return items.tasks[nameOfTask].columnName;
    }
    function handleDragEnd(event) {
        const { active, over } = event;

        if (over.id === "Quie" || over.id === "Develop" || over.id === "Done") {
            const newItems = JSON.parse(JSON.stringify(items));
            const nameOfColumnForAdd = over.id;
            const nameOfTask = active.id;
            //удаление задачи из списка колонки
            const nameOfColumnForDelete = findNameOfColumn(nameOfTask);
            newItems.columns[nameOfColumnForDelete].tasks = newItems.columns[
                nameOfColumnForDelete
            ].tasks.filter((name) => name !== nameOfTask);
            //добавление задачи в список колонки
            newItems.columns[nameOfColumnForAdd].tasks.push(nameOfTask);
            //изменяем поле columnName у задачи на новое
            newItems.tasks[nameOfTask].columnName = nameOfColumnForAdd;
            // устанавливаем время завершения
            if (nameOfColumnForAdd === "Done") {
                newItems.tasks[nameOfTask].endDate = new Date();
            } else {
                newItems.tasks[nameOfTask].endDate = "";
            }
            updateTasks({
                type: "updateTasks",
                payload: {
                    projectName,
                    newItems,
                },
            });

            return;
        }
        if (
            over.id !== active.id &&
            items.tasks[over.id].columnName !==
                items.tasks[active.id].columnName
        ) {
            const newItems = JSON.parse(JSON.stringify(items));
            const nameOfColumnForAdd = findNameOfColumn(over.id);
            const nameOfTask = active.id;
            //удаление задачи из списка колонки
            const nameOfColumnForDelete = findNameOfColumn(nameOfTask);
            newItems.columns[nameOfColumnForDelete].tasks = newItems.columns[
                nameOfColumnForDelete
            ].tasks.filter((name) => name !== nameOfTask);
            //добавление задачи в список колонки
            newItems.columns[nameOfColumnForAdd].tasks.push(nameOfTask);
            //изменяем поле columnName у задачи на новое
            newItems.tasks[nameOfTask].columnName = nameOfColumnForAdd;
            updateTasks({
                type: "updateTasks",
                payload: {
                    projectName,
                    newItems,
                },
            });

            return;
        }
        if (
            over.id !== active.id &&
            items.tasks[over.id].columnName ===
                items.tasks[active.id].columnName
        ) {
            const newItems = JSON.parse(JSON.stringify(items));
            const nameOfActiveTask = active.id;
            const nameOfOverTask = over.id;
            const nameOfColumn = findNameOfColumn(nameOfActiveTask);
            const newIndex = newItems.columns[nameOfColumn].tasks.findIndex(
                (value) => value === nameOfOverTask
            );
            const oldIndex = newItems.columns[nameOfColumn].tasks.findIndex(
                (value) => value === nameOfActiveTask
            );
            const newTasks = arrayMove(
                newItems.columns[nameOfColumn].tasks,
                oldIndex,
                newIndex
            );
            newItems.columns[nameOfColumn].tasks = newTasks;
            updateTasks({
                type: "updateTasks",
                payload: {
                    projectName,
                    newItems,
                },
            });

            return;
        }
    }
    function handleDragStart(event) {
        const { active } = event;
        setActiveId(active.id);
    }

    function findTasksNamesofColumn(nameOfColumn) {
        const listOfColumnTasks = items?.columns[nameOfColumn]?.tasks || [];
        return listOfColumnTasks;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            // onDragMove={handleDragMove}
            // onDragOver={handleDragOver}
        >
            <div className={styles["tasks-column-cont"]}>
                <div className={styles["task-column"]}>
                    <SortableContext
                        items={findTasksNamesofColumn("Quie")}
                        strategy={verticalListSortingStrategy}
                    >
                        <Droppable id={"Quie"}>
                            {findTasksNamesofColumn("Quie").map((name) => (
                                <Task
                                    key={items.tasks[name].id}
                                    id={items.tasks[name].id}
                                    title={items.tasks[name].taskTitle}
                                    start={items.tasks[name].startDate}
                                    activeId={activeId}
                                    priority={items.tasks[name].priority}
                                    endDate={items.tasks[name].endDate}
                                    setOpenTaskDescriptionModal={
                                        setOpenTaskDescriptionModal
                                    }
                                />
                            ))}
                        </Droppable>
                    </SortableContext>
                </div>
                <div className={styles["task-column"]}>
                    <SortableContext
                        items={findTasksNamesofColumn("Develop")}
                        strategy={verticalListSortingStrategy}
                    >
                        <Droppable id={"Develop"}>
                            {findTasksNamesofColumn("Develop").map((name) => (
                                <Task
                                    key={items.tasks[name].id}
                                    id={items.tasks[name].id}
                                    title={items.tasks[name].taskTitle}
                                    start={items.tasks[name].startDate}
                                    activeId={activeId}
                                    priority={items.tasks[name].priority}
                                    endDate={items.tasks[name].endDate}
                                    setOpenTaskDescriptionModal={
                                        setOpenTaskDescriptionModal
                                    }
                                />
                            ))}
                        </Droppable>
                    </SortableContext>
                </div>
                <div className={styles["task-column"]}>
                    <SortableContext
                        items={findTasksNamesofColumn("Done")}
                        strategy={verticalListSortingStrategy}
                    >
                        <Droppable id={"Done"}>
                            {findTasksNamesofColumn("Done").map((name) => (
                                <Task
                                    key={items.tasks[name].id}
                                    id={items.tasks[name].id}
                                    title={items.tasks[name].taskTitle}
                                    start={items.tasks[name].startDate}
                                    activeId={activeId}
                                    priority={items.tasks[name].priority}
                                    endDate={items.tasks[name].endDate}
                                    setOpenTaskDescriptionModal={
                                        setOpenTaskDescriptionModal
                                    }
                                />
                            ))}
                        </Droppable>
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? (
                            <Task
                                id={activeId}
                                title={items.tasks[activeId].title}
                                start={items.tasks[activeId].start}
                            />
                        ) : null}
                    </DragOverlay>
                </div>
            </div>
        </DndContext>
    );
};

function Droppable({ id, children }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return <div ref={setNodeRef}>{children}</div>;
}
