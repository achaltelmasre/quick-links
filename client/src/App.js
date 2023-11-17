import React, { useState } from "react";
import "./App.css";
import copyimg from "./icon-copy.png";
import axios from 'axios'

function App() {
  const [url, seturl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const  generaterLink = async () => {
      const response = await axios.post('./link', {
        url,
        slug
      })
       setShortUrl(response?.data?.data?.shortUrl)
  }

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl)
    alert("Copied to Clipboard")

  }

  return (
    
    <div>
      
      <h1 className="app-title">🔗 Quick Links</h1>

      <div className="app-container">
        <div className="link-generater-card">
          <h2> Link Generation </h2>
          
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
             onClick={ generaterLink}>
            Generate Short URL
          </button>
        </div>

        <div>
          <h2>All Links</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
