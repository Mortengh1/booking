import React from "react";
import Popup from "reactjs-popup";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function RestaurantCard({ restaurant }) {
  //Gets the user id from localStorage
  const userId = localStorage.getItem("userId");
  //The url to the php file that handles bookings
  const BOOKING_URL = "https://skole.mortengh.dk/PHP/booking.php";
  const navigate = useNavigate();
  const errRef = useRef();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [howMany, setHowMany] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [howMany, date, time]);

  //When the form is submittet, it send a post request to the booking url with the values from the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        BOOKING_URL,
        JSON.stringify({
          howMany,
          date,
          time,
          restaurantID: restaurant.id,
          usersID: userId,
        })
      )
      .then((result) => {
        if (result.data.status == "invalid") {
          //If the request is invalid, it sets the error message to the error
          setErrMsg(result.data.errorMessage);
        } else {
          //If the request is good, it empties the values
          setHowMany("");
          setDate("");
          setTime("");
          navigate("/Bookings");
        }
      });
  };

  return (
    <article className="RestaurantCard">
      <img src={restaurant.img} alt={restaurant.title} />
      <div className="TextContainer">
        <h2>{restaurant.resName}</h2>
        <p>
          Adresse: {restaurant.resAddress}, {restaurant.postnr}{" "}
          {restaurant.city}
        </p>
        <p>Kapacitet: {restaurant.capacity}</p>
        <button className="btn" onClick={() => setOpen((o) => !o)}>
          {" "}
          Se Restaurant
        </button>
        <Popup
          position="right center"
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
        >
          <div className="BookingPopup">
            <div className="PopupHeader">
              <h2>{restaurant.resName}</h2>
              <a className="close" onClick={closeModal}>
                &times;
              </a>
            </div>
            <img src={restaurant.img} alt={restaurant.title} />
            <div className="PopupContent">
              <div className="Row">
                <div className="Col-sm-6">
                  <h3>Book</h3>

                  <div className="BookingForm">
                    <p
                      ref={errRef}
                      className={errMsg ? "ErrorMessage" : "offScreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="Field">
                        <label htmlFor="howMany">Hvor mange?</label>
                        <input
                          name="howMany"
                          type="number"
                          onChange={(e) => setHowMany(e.currentTarget.value)}
                          value={howMany}
                          required
                        />
                      </div>
                      <div className="Field">
                        <label htmlFor="date">Dato:</label>
                        <input
                          name="date"
                          type="date"
                          onChange={(e) => setDate(e.currentTarget.value)}
                          value={date}
                          required
                        />
                      </div>
                      <div className="Field">
                        <label htmlFor="time">Tid:</label>
                        <input
                          name="time"
                          type="time"
                          step="3600"
                          min="08:00"
                          max="21:00"
                          onChange={(e) => setTime(e.currentTarget.value)}
                          value={time}
                          required
                        />
                      </div>

                      <button className="btn">Book</button>
                    </form>
                  </div>
                </div>
                <div className="Col-sm-6">
                  <div className="Description">
                    <h3>Beskrivelse</h3>
                    <p>{restaurant.descr}</p>
                    <p>
                      Adresse: {restaurant.resAddress}, {restaurant.postnr}{" "}
                      {restaurant.city}
                    </p>
                    <p>Kapacitet: {restaurant.capacity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </article>
  );
}
