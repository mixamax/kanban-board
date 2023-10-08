import { Modal, Form, Input } from "antd";

import { useDispatch } from "react-redux";

export const ProjectModal = ({ isModalOpen, close }) => {
    const [form] = Form.useForm();
    const addProject = useDispatch();
    const addProjectTasks = useDispatch();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: "${label} is required!",
    };
    /* eslint-enable no-template-curly-in-string */

    const dispatchValuesHandler = (values) => {
        const { project: { name = "", description = "" } = {} } = values;
        addProject({
            type: "addProject",
            payload: {
                projectName: name,
                projectDescription: description,
            },
        });
        addProjectTasks({
            type: "addProjectTasks",
            payload: {
                projectName: name,
            },
        });
        close();
    };
    const modalHandlerCancel = () => {
        form.resetFields();
        close();
    };

    return (
        <Modal
            title="Добавление нового проекта"
            centered
            open={isModalOpen}
            onOk={form.submit}
            onCancel={modalHandlerCancel}
        >
            <Form
                preserve={false}
                form={form}
                {...layout}
                name="project"
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
                onFinish={dispatchValuesHandler}
            >
                <Form.Item
                    name={["project", "name"]}
                    label="Название"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={["project", "description"]}
                    label="Краткое описание"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};
