import { Card } from "antd";
import { Link } from "react-router-dom";

export const ProjectCard = ({ name, description, linkName }) => {
    return (
        <Link to={`/task/${linkName}`}>
            <Card
                hoverable={true}
                title={name}
                bordered={false}
                style={{ width: 250 }}
                bodyStyle={{
                    display: "flex",
                    overflow: "hidden",
                    padding: "1rem",
                    minHeight: "8rem",
                    maxHeight: "8rem",
                }}
            >
                <p
                    style={{
                        margin: "0",
                        overflow: "auto",
                        overflowWrap: "break-word",
                    }}
                >
                    {description}
                </p>
            </Card>
        </Link>
    );
};
