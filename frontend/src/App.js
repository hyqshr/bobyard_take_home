import logo from './logo.svg';
import './App.css';
import CommentPage from './Pages/CommentPage';
import CommentBox from './Components/CommentBox';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Add Comments
        </p>
        <CommentPage />
    
      </header>
    </div>
  );
}

export default App;
