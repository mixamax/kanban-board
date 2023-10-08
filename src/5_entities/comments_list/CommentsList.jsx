import { CarryOutOutlined } from "@ant-design/icons";
import { Tree, Button, Card } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SubCommentModal } from "../subcomment_modal/SubCommentModal";

const { DirectoryTree } = Tree;

const card = (text, openSubComment, parentCommentId) => {
    return (
        <div>
            <Card
                title={""}
                bordered={false}
                style={{ width: 250, marginTop: "1rem" }}
                bodyStyle={{
                    display: "flex",
                    overflow: "hidden",
                    padding: "1rem",
                }}
            >
                <p
                    style={{
                        margin: "0",
                        overflow: "auto",
                        overflowWrap: "break-word",
                    }}
                >
                    {text}
                </p>
            </Card>
            <Button
                onClick={() => openSubComment(parentCommentId)}
                style={{ marginTop: "0.4rem" }}
            >
                comment
            </Button>
        </div>
    );
};

const getCommentsState = (state) => state.reduserComments;

//************************************************************* */

export const CommentsList = ({ selectedTaskId }) => {
    const commentsState = useSelector(getCommentsState);
    const [isSubCommentInputOpen, setIsSubCommentInputOpen] = useState(false);
    const [parentComment, setParentComment] = useState("");
    const openSubCommentInput = (id) => {
        setIsSubCommentInputOpen(true);
        setParentComment(id);
    };
    const closeSubCommentInput = () => {
        setIsSubCommentInputOpen(false);
    };
    const createTitleCallBack = (commentId, index) => {
        const childrenList = commentsState.commentsList.filter(
            (itemId) => commentsState[itemId].parent === commentId
        );
        const key = `0-${index}`;
        return {
            title: card(
                commentsState[commentId].text,
                openSubCommentInput,
                commentsState[commentId]
            ),
            key: key,
            icon: <CarryOutOutlined />,
            children: (childrenList || []).map((commentId, index) =>
                createTitleCallBack(commentId, `${[key]}-${index}`)
            ),
        };
    };

    const createTree = (state) => {
        const filteredComments = state.commentsList.filter(
            (commentId) => state[commentId].taskId === selectedTaskId
        );
        const filteredParentsComments = filteredComments.filter(
            (commentId) => state[commentId].parent === ""
        );
        return filteredParentsComments.map((commentId, index) =>
            createTitleCallBack(commentId, index)
        );
    };
    let treeData;
    commentsState.commentsList
        ? (treeData = createTree(commentsState))
        : (treeData = []);

    return (
        <>
            <DirectoryTree
                selectable={false}
                height={"70vh"}
                virtual={false}
                showLine={true}
                showIcon={false}
                defaultExpandAll
                treeData={treeData}
            />
            <SubCommentModal
                parentComment={parentComment}
                isSubCommentInputOpen={isSubCommentInputOpen}
                closeSubCommentInput={closeSubCommentInput}
            />
        </>
    );
};
