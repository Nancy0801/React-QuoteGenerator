import { useCallback, useState } from 'react'
import { getDatabase , ref , set } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);

function App() {

  const [quote, setQuote] = useState('Click the New Quote button to Generate a quote');
  const [author, setAuthor] = useState('');
  const [copy, setCopy] = useState('Copy');
  const [save, setSave] = useState('Save');
  

  const getQuote = useCallback(() => {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data.quotes);
      let dataQuote = data.quotes;
      let random = Math.floor(Math.random() * dataQuote.length + 1);
      let randomQuote = dataQuote[random];

      setQuote(randomQuote.quote);
      setAuthor(':' + randomQuote.author);
      setSave('Save');
    })
  }, [setAuthor, setQuote, setSave]);

  const copyQuote = useCallback(() => {
    quote.current?.select();
    quote.current?.setSelectionRange(0, quote.length);
    window.navigator.clipboard.writeText(quote);
    setCopy('Copied')
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Shared Quote',
          text: quote,
        });
      } else {
        throw new Error('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const SaveQuote = () => {
    set(ref(db, "User/Quotes" ), {
      Quote: quote,
      Author: author
    });
    alert("Quote Saved!");
    setSave('Saved')
  } ;

  return (
    <>
      <div className='h-screen w-full bg-blue-800 flex  flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold text-white py-4 '>QUOTE GENERATOR</h1>
          <div className='w-3/6 h-auto bg-white rounded-xl p-9 font-serif text-xl shadow-md shadow-black' >
              <div className="quote font-sans p-3">{quote}</div>
              <div className="author text-right pb-2"> {author}</div>
              <div className="buttons flex justify-between ">
                <div className='mt-1'>
                <button className='p-1 m-1 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700' title='Copy' onClick={copyQuote}>{copy}</button>
                <button className='p-1 m-1 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700' title='Share' onClick={handleShare}>Share</button>
                <button className='p-1 m-1 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700' title='Save' onClick={SaveQuote}>{save}</button>
                </div>
                <button className='p-2 m-1 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700' 
                title='New Quote' onClick={getQuote}>New Quote</button>
              </div>
          </div>
        
      </div>
    </>
  )
}

export default App
