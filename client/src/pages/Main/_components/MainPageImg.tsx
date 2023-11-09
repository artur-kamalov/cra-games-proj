const MainPageImg = () => {

  return (
    <div
    style={
        {backgroundImage: `url("https://wallpaperaccess.com/full/1146370.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }
    }
    className="main-page-img-container"
    >
        <h1 className="main-page-title">
            Sekiro: Shadows Die Twice
            <h2 className="main-page-subtitle">
                game of the year
            </h2>
        </h1>
    </div>
  )
}

export default MainPageImg