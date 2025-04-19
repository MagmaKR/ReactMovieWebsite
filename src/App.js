import React from 'react';

function App() {
  return (
    <div className="App">
      <main>
        <div className="pattern"></div>
        <div className="wrapper">
          <header>
            <h1>Welcome to My First React App</h1>
            <p className="text-light-100 text-center mt-4">
              This is a demo application with custom fonts and styling
            </p>
          </header>
          
          <div className="search">
            <div>
              <img src="/search.svg" alt="search" />
              <input 
                type="text"
                placeholder="Search for movies..."
              />
            </div>
          </div>
          
          <section className="trending">
            <h2>Trending Now</h2>
            <ul>
              <li>
                <p>MOVIES</p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
