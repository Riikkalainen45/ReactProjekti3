import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


const GetData = () => {
  fetch("https://api.jsonbin.io/b/5ea4545298b3d53752345550/1")
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data);
      const items = data.countries;
      ReactDOM.render(
        <CountryArray data={items} />,
        document.getElementById("root")
      );
    });
  return <div>Nothing here. Fething data...</div>;
};

const CountryArray = (props) => {
  const { data } = props;
  var posterImg;


  // Funktio tyhjien kuvien tsekkaamiseen
  const CheckPoster = (props) => {
    var poster = props.src;
    // Ikoni kuvan korvaamiseksi
    if (poster == "" || poster == null) {
      posterImg = "https://via.placeholder.com/150";
    } else {
      posterImg = poster;
    }
    // Palauttaa kuva tagin
    return (
      <img
        src={posterImg}
        className="img-thumbnail"
        alt="Poster image"
        onError={addDefaultSrc}
        width="50%"
      />
    );
  };

  //Kuvan korvaava tagi
  const addDefaultSrc = (ev) => {
    console.log(ev.target);
    ev.target.src = "https://via.placeholder.com/150";
    ev.onError = null;
  };

  return (
    <div>
      <SearchBar />
      <table className="table table-striped table-bordered">
        <thead>
          <tr key={props.id}>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Ranking</th>
            <th scope="col">Temperature</th>
            <th scope="col">National Dish</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr>
              <td key={i}> {item.country}</td>
              <td> {item.city} </td>
              <td> {item.ranking} </td>
              <td> {item.temperature}</td>
              {}
              <td id="pic">
                <CheckPoster src={item.poster} />
              </td>
              <td> {item.dish} </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};



/*
return (
  <div className="app">
    <h1>Happiest Countries in the WORLD!</h1>

    <td className="country">
      {data.map((item) => (
        <tr >
          {item.country}  <strong> {item.city} </strong> ( {item.ranking})
        </tr>

      ))}
    </td>
  </div>
);
};
//{"country":"query"};
*/

const SearchBar = () => {

  // Määritellään käsittelija napille 1 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Tapahtuman aiheutti: ", event.target);
    var form = event.target;
    console.log("Hakusana: ", form.query.value);
  };

  // Määritellään käsittelija napille 2 
  const handleClick = (event) => {
    event.preventDefault();
    console.log("Tapahtuman aiheutti: ", event.target);
    GetData();
  };
  // Komponentin palauttama JSX muotoinen esitys
  return (
    <div>
      <h1>Happiest People live here:</h1>
      <div>
        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Hae kaikki
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
