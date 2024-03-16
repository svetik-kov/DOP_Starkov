import s from './DecksList.module.css'
import { DeckItem } from './DeckItem/DeckItem.tsx'
import { useFetchDecks } from './useFetchDecks.ts'
import {useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import {DeckItemSkeleton} from '../../../features/decks/DecksList/DeckItem/DeckItemSkeleton';

export const DecksList = () => {

  const { decks,isLoading } = useFetchDecks()

  return (
      <>

       {/* {isLoading &&  <Skeleton height={100} count={10} style={{marginButton:'10px'}}/>}*/}
          {isLoading &&  <DeckItemSkeleton count={10}/>}
        <ul className={s.list}>
          {decks.map((deck) => (
              <DeckItem key={deck.id} deck={deck} />
          ))}
        </ul>
      </>

  )
}
