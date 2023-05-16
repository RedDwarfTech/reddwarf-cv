import { createBrowserRouter } from "react-router-dom";
import App from "../../page/home/App";
import Exp from "@/page/exp/Exp";
import Template from "@/page/template/Template";
import CV from "@/page/cv/CV";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/exp",
        element: <Exp />
    },
    {
        path: "/template",
        element: <Template />
    },
    {
        path: "/cvlist",
        element: <CV />
    },
]);

export default routes;

