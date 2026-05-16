import './App.css'
import {HeaderSimple} from './Header';
import NotionPage from './Pages/CalendarPage'
import Login from './Pages/Login';
import { DataTime } from './DataTime';

function App() {
  return (
    <DataTime>
      <HeaderSimple></HeaderSimple>
      <Login></Login>
      {/* <CalendarPage></CalendarPage> */}
    </DataTime>
  )
}

export default App;
