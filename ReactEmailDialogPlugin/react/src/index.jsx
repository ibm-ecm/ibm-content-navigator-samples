import { ReactLoader } from "./services/reactloader";
import { ReactMessageService } from "./services/reactmessage";
import 'ap-components-react/dist/ap-components-react.min.css';

window.reactServiceForEmailDialog = new ReactMessageService();
let reactLoaderForEmailDialog = new ReactLoader(window.reactServiceForEmailDialog);
