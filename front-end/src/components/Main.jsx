import React from 'react';
import ItemList from './ItemList';
import { artistArray } from '../assets/database/artists';
import { songsArray } from '../assets/database/songs';

const Main = ({ type }) => {
  return (
    <div className="main">
        { type === 'artists' || type === undefined ? 
          <ItemList 
              title="Artistas" 
              itens={3} 
              itemsArray={artistArray} 
              path="/artists"
              idPath="/artist"/> 
          : <></> }

        { type === 'songs' || type === undefined ?
          <ItemList 
              title="Musicas" 
              itens={6} 
              itemsArray={songsArray} 
              path="/songs"
              idPath="/song"/>  
          : <></> }
    </div>
  );
}

export default Main