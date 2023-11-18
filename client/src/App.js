import React, { useEffect, useState } from "react";
import "./App.css";
import copyimg from "./icon-copy.png";
import axios from 'axios'


function App() {
  const [url, seturl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);

  // const  generateLink = async () => {
  //     const response = await axios.post('/link', {
  //       url,
  //       slug
  //     })
  //      setShortUrl(response?.data?.data?.shortUrl)
  // }
  

  // const copyShortUrl = () => {
  //   navigator.clipboard.writeText(shortUrl)
  //   alert("Copied to Clipboard")
  // }

  // const loadLinks = async () => {
  //   const response = await axios.get('/api/links');

  //   setLinks(response?.data?.data)
  // }

  // useEffect(() => {
  //   loadLinks();
  // }, [])

  const  generateLink = async () => {
    const response = await axios.post('/link', {
      url,
      slug
    })

    setShortUrl(response?.data?.data?.shortUrl)
  }

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!')
  }

  const loadLinks = async () => {
    const response = await axios.get('/api/links');

    setLinks(response?.data?.data)
  }

  useEffect(()=>{
    loadLinks();
  }, [])

  return (
    
    <div>

      <h1 className="app-title">🔗 Quick Links</h1>

      <div className="app-container">
        <div className="link-generater-card">
          <h2 className="link-generator"> Link Generation </h2>
          
          <input
            type="text"
            placeholder="URL"
            className="user-input"
            value={url}
            onChange={(e) => {
              seturl(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="slug (optional)"
            className="user-input"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
            }}
          />

          <div className="short-url-container">
            <input
              type="text"
              placeholder="short URL "
              className="input-short-url"
              value={shortUrl}
              disabled
            />
            <img src={copyimg} 
              alt="copy"
               className="copy-icon"
               onClick={copyShortUrl}/>
          </div>

          <button type="button"
            className="btn-generate-link"
             onClick={ generateLink}>
            Generate Short URL
          </button>
        </div>

        <h2 className="app-title">All Links</h2>
        <div className="all-links-container">
        
          {
            links?.map((linkObj, index) => {
              const {url, slug, clicks} = linkObj;
             
              return (
                <div className="link-card" key={index}>
                  <p>URL : {url}</p>
                  <p>Short URL:{process.env.REACT_APP_BASE_URL} {slug}</p>
                  <p>Clicks: {clicks}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
