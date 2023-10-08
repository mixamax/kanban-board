import { Layout, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ProjectCard, ProjectModal } from "../../5_entities";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ProjectsPage = () => {
    const { Content } = Layout;
    const [modalOpen, setModalOpen] = useState(false);
    const projects = useSelector((state) => state.reduserProjects);

    const setClose = () => {
        setModalOpen(false);
    };

    return (
        <Content
            style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
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
            <Space
                size={"large"}
                align={"start"}
                wrap={true}
                style={{
                    minHeight: "80%",
                    minWidth: "95%",
                    maxWidth: "95%",
                    marginTop: "2rem",
                    border: "solid 1px rgba(255, 255, 255, 1)",
                    borderRadius: "10px",
                    padding: "1rem",
                    flexGrow: "1",
                    overflowY: "auto",
                }}
            >
                {projects.ids.map((item) => (
                    <ProjectCard
                        key={item}
                        linkName={item}
                        name={projects.entities[item].name}
                        description={projects.entities[item].description}
                    />
                ))}

                <ProjectModal isModalOpen={modalOpen} close={setClose} />
            </Space>
        </Content>

        //     </Layout>
    );
};
export default ProjectsPage;
