import Header from "@/component/header/Header";
import { readConfig } from "@/config/app/config-reader";
import store from "@/redux/store/store";
import { Goods } from "rd-component";
import 'rd-component/dist/style.css';

const AppGoods: React.FC = () => {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <Goods refreshUser={true} appId={readConfig("appId")} store={store}></Goods>
            </div>
        </div>
    );
}

export default AppGoods;