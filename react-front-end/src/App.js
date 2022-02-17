import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Register from './Register';



function App() {
  return (
    <main className="App">
      <Navbar/>
      <Register />    
    </main>
  );
  // render() {
  //   return (
  //     <main className="App">
  //       <h1>{ this.state.message }</h1>
  //       <button onClick={this.fetchData} >
  //         Fetch Data
  //       </button>  
  //     </main>
  //   );
  // }
}

export default App;
