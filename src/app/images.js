import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./page.css";
import { FaTimes } from 'react-icons/fa';
import { debounce } from "./utils/commonUtils";
import Spinner from "./components/spinner";
import NotFound from "./components/not-found";
import { IMAGE_NOT_FOUND_TEXT, PAGE_BUTTONS, PAGINATION_LIMIT } from "./lib/constants";
import Card from "./card";

export default function Images() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const searchRef = useRef(false);

  useEffect(() => {
    getImages(page, search);
  }, [page]);

  useEffect(() => {
    if(search || searchRef.current) {
        setPage(0);
        searchImages(0, search);
        searchRef.current = true;
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const getImages = async(pageNumber, searchText) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api?page=${pageNumber}&limit=${PAGINATION_LIMIT}&breed=${searchText}`);
      setImages(response.data.images);
      let calPages = Math.floor(response.data.total/PAGINATION_LIMIT) - parseInt(response.data.total%PAGINATION_LIMIT===0?1:0)
      setLastPage(calPages);
      setLoading(false);
    } catch(e) {
      console.error(`Error when fetching images: ${e}`);
    }
  }

  const searchImages = useCallback(debounce(getImages, 2000), []);

  const pageHandler = (value) => {
    if(value === '<<') {
      setPage(0);
    } else if(value === '>>') {
      setPage(lastPage);
    } else if(value === '<') {
      setPage(prev => prev-1);
    } else if(value === '>') {
      setPage(prev => prev+1);
    }
  }

  const getPageNumberStyle = (button) => {
    if((loading) || (page === 0 && (['<', '<<'].includes(button))) || (page === lastPage && (['>', '>>'].includes(button)))) {
      return "disabledPageNumber";
    }
    return "pageNumber";
  }

  return (
      <div className="content">
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder="Search by breed id"
            value={search}
            onChange={(e)=>handleSearch(e)}
          />
          {search && (
            <span className="clearButton" onClick={()=>setSearch('')}>
              <FaTimes />
            </span>
          )}
        </div>
        {loading? <Spinner/>:
          (images.length > 0? <Card images={images}/> : <NotFound notFoundText={IMAGE_NOT_FOUND_TEXT}/>)
        }
        {images.length > 0 &&
        <div className="paginationContainer">
          {
            PAGE_BUTTONS.map((item) => {
              return(
                <span key={item} className={getPageNumberStyle(item)} onClick={()=>pageHandler(item)}>
                  {item}
                </span>
              )
            })
          }
        </div>}
      </div>
  );
}
