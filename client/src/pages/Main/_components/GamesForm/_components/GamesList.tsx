import GameItem from "./GameItem";
import { GameType } from '../../../../../types';

interface GameListProps {
    games: GameType[],
    filterText: string,
    inWhishListOnly: boolean,
}

export default function GamesList({
  games = [],
  filterText = "",
  inWhishListOnly = false,
}: GameListProps) {

  console.log("GamesList Render")
  
  return (
    <div className="game-cards">
      
      {(filterText && inWhishListOnly) &&
        (<>
            {games
              .filter(game => game.inWishList && !game.name.toLocaleLowerCase().indexOf(filterText))
              .map(game => (
                <GameItem game={game} key={game.name} />
            ))}
        </>)
      }

      {(filterText && !inWhishListOnly) && 
        (<>
          {games
            .map(game => {
              if(game.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()))
              return (<GameItem game={game} key={game.name} />)
              return null
            })}
        </>)
      }

      {(inWhishListOnly && !filterText) &&
        (<>
          {games
            .filter(game => game.inWishList)
            .map(game => (
            <GameItem game={game} key={game.name} />
          ))}
        </>)
      }
      
      {(!inWhishListOnly && !filterText) &&
        (<>
          {games
            .map(game => (
            <GameItem game={game} key={game.name}/>
          ))}
        </>)
      }
    </div>
  );
}