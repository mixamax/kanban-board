import "./App.css";
import { Routing } from "../2_pages";
import { withRouter, withProvider } from "./with_router_provider.js";

function App() {
    return (
        <div>
            <Routing />
        </div>
    );
}

export default withProvider(withRouter(App));
