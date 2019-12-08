import React, {useState, useEffect} from 'react';
import './App.css';
import './semantic/semantic.min.css'

import Header from './Main/Header';
import Body from './Main/Body';
import SessionModal from './Main/SessionModal';
import axios from 'axios';
import { format, getDay } from 'date-fns';

function App() {
  
  const [values, setValues] = useState({
    allSessions: [],    
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    tags: [],    
    isLoading: true      
  });

  const [selectedSession, setSelectedSession] = useState({tags: []});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {    
      const tuesday = values.tuesday.map(x => ({...x, isFavorite: favorites.some(y => y === x.id) ? true : false}));
      const wednesday = values.wednesday.map(x => ({...x, isFavorite: favorites.some(y => y === x.id) ? true : false}));
      const thursday = values.thursday.map(x => ({...x, isFavorite: favorites.some(y => y === x.id) ? true : false}));
      const friday = values.friday.map(x => ({...x, isFavorite: favorites.some(y => y === x.id) ? true : false}));
      const allSessions = values.allSessions.map(x => ({...x, isFavorite: favorites.some(y => y === x.id) ? true : false}));
      setValues({...values, tuesday, wednesday, thursday, friday, allSessions});            
  }, [favorites]);

  const getDayName = (num) => {
    switch (num) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        break;
    }
  }

  const getLink = () => {    
    navigator.clipboard.writeText(`${document.location.origin.toString()}/codemash2020?favs=${btoa(favorites)}`);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    const init = async () => {      
      let favorites = [];

      if (document.cookie !== "") {
        favorites = document.cookie.split(',');
      }
      
      if (window.location.search.includes("favs")) {
        const query = new URLSearchParams(window.location.search);
        const favsQuery = query.get("favs");
        favorites = atob(favsQuery).split(',');
      } 
      
      const result = await axios.get("https://sessionize.com/api/v2/p05udyko/view/sessions");
      
      let allTags = [];
      
      const sessions = result.data[0].sessions
        .filter(x => {
          return !x.categories.some(y => y.categoryItems.some(z => z.name === "KidzMash Sessionz"))
        })
        .map(x => {
          const sessionTags = x.categories.filter(y => y.name === "Tags").map(y => y.categoryItems).flat(1);          
          const tagsToAdd = sessionTags.filter(x => !allTags.some(y => y.id === x.id));
          
          if (tagsToAdd.length > 0)
            allTags = allTags.concat(tagsToAdd);

          return {
            id: x.id,
            day: getDayName(getDay(Date.parse(x.startsAt))), 
            time: format(Date.parse(x.startsAt), 'h:mm aa'), 
            description: x.description,
            title: x.title,
            tags: sessionTags,
            room: x.room, 
            isFavorite: favorites.some(x => x === x.id),
            speaker: x.speakers[0].name
          }          
        });     
      
      setValues({
          ...values, 
          allSessions: sessions, 
          tuesday: sessions.filter(x => x.day === "Tuesday"), 
          wednesday: sessions.filter(x => x.day === "Wednesday"),
          thursday: sessions.filter(x => x.day === "Thursday"),
          friday: sessions.filter(x => x.day === "Friday"),
          tags: allTags,           
          isLoading: false
        });
      setFavorites(favorites);
    }
    init();
  },[]);

  const handleFilterChanged = (filter) => {
    const tuesday = !filter.showPrecompilers ? [] : values.allSessions
      .filter(x => x.day === "Tuesday")
      .filter(x => {
        if (filter.onlyFavorites && !x.isFavorite) {
          return false;
        }
        return true;
      })
      .filter(x => filter.tags.length > 0 ? filter.tags.some(y => x.tags.find(z => z.id === y)) : x);
    const wednesday = !filter.showPrecompilers ? [] : values.allSessions
      .filter(x => x.day === "Wednesday")
      .filter(x => {
        if (filter.onlyFavorites && !x.isFavorite) {
          return false;
        }
        return true;
      })
      .filter(x => filter.tags.length > 0 ? filter.tags.some(y => x.tags.find(z => z.id === y)) : x);

    const thursday = values.allSessions
      .filter(x => x.day === "Thursday")
      .filter(x => {
        if (filter.onlyFavorites && !x.isFavorite) {
          return false;
        }
        return true;
      })
      .filter(x => filter.tags.length > 0 ? filter.tags.some(y => x.tags.find(z => z.id === y)) : x);
    const friday = values.allSessions
      .filter(x => x.day === "Friday")
      .filter(x => {
        if (filter.onlyFavorites && !x.isFavorite) {
          return false;
        }
        return true;
      })
      .filter(x => filter.tags.length > 0 ? filter.tags.some(y => x.tags.find(z => z.id === y)) : x);

    setValues({ ...values, tuesday, wednesday, thursday, friday });    
  };

  const handleFavoritesChanged = (sessionId, closeModal) => {
    if (favorites.some(x => x === sessionId)) {
      const newfavorites = [...favorites.filter(x => x !== sessionId)];
      document.cookie = newfavorites;
      setFavorites(newfavorites);
    }      
    else  {
      const newfavorites = [...favorites, sessionId];
      document.cookie = newfavorites;
      setFavorites(newfavorites);
    }      

    if (closeModal)
      handleCloseModal();
  }

  const handleSessionDetailsClicked = (sessionId) => {    
    setSelectedSession(values.allSessions.find(s => s.id === sessionId));
    setValues({...values, isModalOpen: true});
  };

  const handleCloseModal = () => {
    setValues({...values, isModalOpen: false});
  };

  return (
    <div className="App">
      <Header 
        handleFilters={handleFilterChanged}
        handleGetLink={getLink}
        tags={values.tags.map(x => ({text: x.name, value: x.id, index: x.id}))}
      />
      <Body         
        handleSessionDetailsClicked={handleSessionDetailsClicked}
        handleFavoritesChanged={handleFavoritesChanged}
        tuesday={values.tuesday}
        wednesday={values.wednesday}
        thursday={values.thursday}
        friday={values.friday}
        isLoading={values.isLoading}
      />
      <SessionModal 
        session={selectedSession}
        visible={values.isModalOpen}
        onClose={handleCloseModal}
        handleFavoritesChanged={handleFavoritesChanged}
      />
    </div>
  );
}

export default App;
