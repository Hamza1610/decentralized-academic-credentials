import { useState } from 'react';

function App() {

  const [message, setMessage] = useState('Hello!');

  return (
    <div className='main'>
      <h2>Welcome To The Internet Computer</h2>
      <div className='content'>
        <p>Say Hello</p>
        <button onClick = { () => alert(message) }>Test</button>
      </div>
    </div>
  );
}

export default App;
