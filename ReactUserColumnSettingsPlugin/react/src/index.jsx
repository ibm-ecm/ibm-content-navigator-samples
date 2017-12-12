import { ReactLoader } from './services/reactloader';
import { ReactMessageService } from './services/reactmessage';
import './styles/app.css';

window.reactServiceForUserColumnSettings = new ReactMessageService();
let reactLoaderForUserColumnSettings = new ReactLoader(window.reactServiceForUserColumnSettings);
