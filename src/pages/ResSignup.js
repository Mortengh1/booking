import { useRef, useState, useEffect } from "react";
import imgPlaceholder from "../images/placeholder.png";

import axios from "../api/axios";

//The url to the php file that handles restaurant signups
const SIGNUP_URL = "https://skole.mortengh.dk/PHP/resSignup.php";

const ResSignup = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postnr, setPostnr] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [capacity, setCapacity] = useState("");
  const [phonenr, setPhonenr] = useState("");
  const [image, setImage] = useState("");
  const [descr, setDescr] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //Tells which field to focus
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, address, mail, capacity, phonenr, image, descr]);

  //Checks the image size and makes sure its not to big, and sets the image so it can be previewed
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrMsg("");
    } else {
      setErrMsg("Billedet er for stort");
    }
  }

  //Makes a post request with the values fromm the fields of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        SIGNUP_URL,
        JSON.stringify({
          resName: name,
          resAddress: address,
          postnr,
          city,
          mail,
          capacity,
          phonenr,
          image,
          descr,
        })
      )
      .then((result) => {
        //If the request is invalid, it sets the error message to the error
        //If the request is good, it clears the values
        if (result.data.status == "invalid") {
          setErrMsg(result.data.errorMessage);
        } else {
          setName("");
          setAddress("");
          setPostnr("");
          setCity("");
          setMail("");
          setCapacity("");
          setPhonenr("");
          setImage("");
          setDescr("");
        }
      });
  };

  return (
    <div className="App">
      <div className="CreateRestaurantContainer">
        <div className="RestaurantForm">
          <h1>Opret Restaurant</h1>
          <p
            ref={errRef}
            className={errMsg ? "ErrorMessage" : "offScreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="Row">
              <div className="Field">
                <label htmlFor="name">Restaurant navn</label>
                <input
                  type="text"
                  name="name"
                  id="Name"
                  ref={userRef}
                  onChange={(e) => setName(e.currentTarget.value)}
                  value={name}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="city">By</label>
                <input
                  type="text"
                  name="city"
                  id="City"
                  ref={userRef}
                  onChange={(e) => setCity(e.currentTarget.value)}
                  value={city}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="postnr">Post nr.:</label>
                <input
                  type="text"
                  name="postnr"
                  id="Postnr"
                  ref={userRef}
                  onChange={(e) => setPostnr(e.currentTarget.value)}
                  value={postnr}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  name="address"
                  id="Address"
                  ref={userRef}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                  value={address}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="mail">Mail</label>
                <input
                  type="email"
                  name="email"
                  id="Mail"
                  ref={userRef}
                  onChange={(e) => setMail(e.currentTarget.value)}
                  value={mail}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="capacity">Kapacitet</label>
                <input
                  type="number"
                  name="capacity"
                  id="Capacity"
                  ref={userRef}
                  onChange={(e) => setCapacity(e.currentTarget.value)}
                  value={capacity}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="phonenr">Tlf. nr.</label>
                <input
                  type="tel"
                  name="phonenr"
                  id="Phonenr"
                  ref={userRef}
                  onChange={(e) => setPhonenr(e.currentTarget.value)}
                  value={phonenr}
                  required
                ></input>
              </div>
              <div className="Field">
                <label htmlFor="descr">Beskrivelse</label>
                <input
                  type="textarea"
                  name="descr"
                  id="Description"
                  ref={userRef}
                  onChange={(e) => setDescr(e.currentTarget.value)}
                  value={descr}
                  required
                />
              </div>
              <div className="Field">
                <label htmlFor="image">Billede</label>
                <input
                  type="file"
                  name="image"
                  className="File-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <img
                  className="Image-preview"
                  src={image}
                  alt="choose"
                  onError={(event) => (event.target.src = imgPlaceholder)}
                />
              </div>
            </div>
            <button className="btn">Opret</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResSignup;
