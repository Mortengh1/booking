import React from "react";
import { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "../api/axios";

export default function BookingCard({ booking }) {
  //Gets the user id from localStorage
  const userId = localStorage.getItem("userId");
  //The url to the php file that deletes bookings
  const DELETE_URL = "https://skole.mortengh.dk/PHP/deleteBooking.php";
  const bookingId = booking.id;
  const dateTime = booking.date + "T" + booking.time;
  const bookingTime = new Date(dateTime);
  const current = new Date();
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  let formattedDate = format(bookingTime, "dd/M/yyyy");
  let formattedTime = format(bookingTime, "H:mm");

  async function deleteBooking() {
    /*When the cancel button is clicked it ask the user to confirm. If the user confirms 
    it send a post quest to the php file with the user id and the booking id */
    const confirmDelete = window.confirm(
      `Vil du annullere bookingen hos ${booking.resName} d. ${formattedDate} kl. ${formattedTime}?`
    );
    if (confirmDelete) {
      axios
        .post(
          DELETE_URL,
          JSON.stringify({
            userId,
            bookingId,
          })
        )
        .then((result) => {
          if (result.data.status == "invalid") {
            //If the request is invalid, tells the error in an alert
            alert(result.data.errorMessage);
          } else {
            //If the request is good, it tells the user that the booking is cancel and reload the page
            window.location.reload();
            alert("Bookingen Annulleret");
          }
        });
    }
  }
  async function deleteOldBooking() {
    /* When the delete button is clicked, it ask the user to confirm and if it is confirmed, 
    it send a post request to the php file with the user id and the booking id */
    const confirmDelete = window.confirm(
      `Vil du slette bookingen hos ${booking.resName} d. ${formattedDate} kl. ${formattedTime}?`
    );
    if (confirmDelete) {
      axios
        .post(
          DELETE_URL,
          JSON.stringify({
            userId,
            bookingId,
          })
        )
        .then((result) => {
          if (result.data.status == "invalid") {
            //If the request is invalid, it tells the user in an alert
            alert(result.data.errorMessage);
          } else {
            //If the request is good, it tells the user in an alert and reloads the page
            window.location.reload();
            alert("Bookingen slettet");
          }
        });
    }
  }

  return (
    <article className="BookingCard">
      <img src={booking.img} alt={booking.resName} />
      <div className="TextContainer">
        <h2>{booking.resName}</h2>
        <p>Dato: {formattedDate}</p>
        <p>Kl.: {formattedTime}</p>
        <p>Antal personer: {booking.numbOfPeople}</p>
        {formattedDate >= currentDate ? (
          <button className="btn btn-delete" onClick={deleteBooking}>
            Annuller booking
          </button>
        ) : (
          <button className="btn btn-delete" onClick={deleteOldBooking}>
            Slet
          </button>
        )}
      </div>
    </article>
  );
}
