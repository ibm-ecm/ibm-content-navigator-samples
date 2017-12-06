import { ReactLoader } from "./services/reactloader";
import { ReactMessageService } from "./services/reactmessage";
import './3pt/ap-components/ap-components-react.min.css';

window.reactServiceForEmailDialog = new ReactMessageService();
let reactLoaderForEmailDialog = new ReactLoader(window.reactServiceForEmailDialog);
