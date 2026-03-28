import './App.css'
import {HeaderSimple} from './Header';
import CalendarPage from './Pages/CalendarPage'
import { DataTime } from './DataTime';

function App() {
  return (
    <DataTime>
      <HeaderSimple></HeaderSimple>
      <CalendarPage></CalendarPage>
    </DataTime>
  )
}

export default App;
