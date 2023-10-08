import { Modal, Button, Input, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const SubCommentModal = ({
    closeSubCommentInput,
    isSubCommentInputOpen,
    parentComment,
}) => {
    const addComment = useDispatch();
    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 50 },
    };

    const [formSubCom] = Form.useForm();
    const dispatchValueofForm = (values) => {
        const commentText = values.comment.text;

        const parentCommentId = parentComment.id;
        const taskId = parentComment.taskId;

        if (commentText) {
            addComment({
                type: "addComment",
                payload: {
                    id: `com-${uuidv4()}`,
                    text: commentText,
                    parent: parentCommentId,
                    taskId: taskId,
                },
            });
        }
        formSubCom.resetFields();
    };

    return (
        <Modal
            open={isSubCommentInputOpen}
            onOk={closeSubCommentInput}
            onCancel={closeSubCommentInput}
        >
            <Form
                preserve={false}
                form={formSubCom}
                {...layout}
                name="sub-comment"
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
        </Modal>
    );
};
