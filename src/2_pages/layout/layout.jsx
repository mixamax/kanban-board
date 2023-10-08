import { Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export const LayoutPage = () => {
    return (
        <div>
            <Layout style={{ minHeight: "100vh", maxHeight: "100vh" }}>
                <Header
                    style={{
                        color: "white",
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    projects planner
                </Header>

                <Outlet />

                <Footer
                    style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    -- footer --
                </Footer>
            </Layout>
        </div>
    );
};
