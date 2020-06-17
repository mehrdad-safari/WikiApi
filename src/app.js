import React from 'react';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import WikiApi from './components/WikiApi';

function App() {
  return (
    <div className='App'>
      <Header />
      <WikiApi keyword='Albert_Einstein' />
      <Footer />
    </div>
  );
}

export default App;
