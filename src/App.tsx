import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import Tasks from './Tasks';

export default function App() {
  return (<div id="appMain">
    <h1 className='display-3'>00:00</h1>

    <div id="screenBtn">
      <Button variant="primary">Start</Button>
      <Button variant="danger ">Stop</Button>
      <Button variant="success">Next</Button>
    </div>
    <Tasks/>
    
    </div>
  );
}