import { Modal, Button, Input, Form } from "antd";
import { CommentsList } from "../comments_list/CommentsList";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const CommentModal = ({
    isCommentOpen,
    closeComment,
    selectedTaskId,
}) => {
    const addComment = useDispatch();
    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 50 },
    };

    const [formCom] = Form.useForm();
    const dispatchValueofForm = (values) => {
        const commentText = values.comment.text;
        if (commentText && selectedTaskId) {
            addComment({
                type: "addComment",
                payload: {
                    id: `com-${uuidv4()}`,
                    text: commentText,
                    parent: "",
                    taskId: selectedTaskId,
                },
            });
        }
        formCom.resetFields();
    };

    return (
        <Modal open={isCommentOpen} onOk={closeComment} onCancel={closeComment}>
            <Form
                preserve={false}
                form={formCom}
                {...layout}
                name="comments"
                style={{ marginTop: "2rem" }}
                onFinish={dispatchValueofForm}
            >
                <Form.Item
                    name={["comment", "text"]}
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        добавить комментарий
                    </Button>
                </FormItem>
            </Form>

            <CommentsList selectedTaskId={selectedTaskId} />
        </Modal>
    );
};
