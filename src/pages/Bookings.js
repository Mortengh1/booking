import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";

const Bookings = () => {
  //Gets user id from localStorage
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    //Gets the users bookings based on the user id
    async function getBookings() {
      const url = `https://skole.mortengh.dk/PHP/userBookings.php?userId=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      const bookingsArray = Object.keys(data).map((key) => ({
        key: key,
        ...data[key],
      })); // from object to array
      setBookings(bookingsArray);
    }
    getBookings();
  }, []);

    return(
      <div className="BookingGrid">
      {bookings.map((booking) => {
        return <BookingCard booking={booking} key={booking.key} />;
      })}
    </div> 
    )
  };
  
  export default Bookings;