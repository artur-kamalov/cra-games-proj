import { useState } from "react";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import GameList from "./_components/GamesList";
import { GameType } from "../../../../types";
import './GamesForm.css'

interface FilterableGameListProps {
    games: GameType[]
}

export default function GamesForm({games}: FilterableGameListProps) {
  const [filterText, setFilterText] = useState("");
  const [inWhishListOnly, setInWhishListOnly] = useState(false);

  return (
    <div className="container">
        <SearchBar
          filterText={filterText}
          onFilterTextChange={setFilterText}
          inWhishListOnly={inWhishListOnly}
          oninWhishListOnlyChange={setInWhishListOnly}
        />
        <GameList
          games={games}
          filterText={filterText}
          inWhishListOnly={inWhishListOnly}
        />
    </div>
  );
}