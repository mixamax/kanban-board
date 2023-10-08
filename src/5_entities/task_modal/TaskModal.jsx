import { Modal, Form, Input, Radio, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskModal = ({ isModalOpen, close, projectName }) => {
    const [form] = Form.useForm();
    const [value, setValue] = useState(1);

    const onChangeRadio = (event) => {
        setValue(event.target.value);
    };

    const addTask = useDispatch();

    // ************************************************* filepicker
    const property = {
        name: "file",
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    // *************************************************

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const modalHandlerCancel = () => {
        form.resetFields();
        setValue(1);
        close();
    };
    const dispatchValuesHandler = (values) => {
        const { task: { name = "", description = "" } = {} } = values;

        addTask({
            type: "addTask",
            payload: {
                projectName,
                taskName: `task-${uuidv4()}`,
                taskTitle: name,
                taskDescription: description,
                startDate: new Date(),
                priority: value || 1,
                endDate: "",
                duration: "",
                subTask: {},
                files: {},
                comments: {},
            },
        });

        close();
        form.resetFields();
        setValue(1);
    };

    return (
        <Modal
            title="Добавление новой задачи"
            centered
            open={isModalOpen}
            onOk={form.submit}
            // onOk={modalHandlerOk}
            onCancel={modalHandlerCancel}
        >
            <Form
                preserve={false}
                form={form}
                {...layout}
                name="task"
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
                onFinish={dispatchValuesHandler}
            >
                <Form.Item
                    name={["task", "name"]}
                    label="Название"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={["task", "description"]} label="Описание">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <div style={{ margin: "1rem" }}>
                        <span style={{ margin: "1rem" }}>приоритет: </span>
                        <Radio.Group
                            onChange={onChangeRadio}
                            name="radiogroup"
                            value={value}
                        >
                            <Radio value={1}>низкий</Radio>
                            <Radio value={2}>средний</Radio>
                            <Radio value={3}>высокий</Radio>
                        </Radio.Group>
                    </div>
                </Form.Item>

                <Upload {...property}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form>
        </Modal>
    );
};
