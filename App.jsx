import React, { useState } from 'react';
import './index.css';

const App = () => {
    const [seatsLeft, setSeatsLeft] = useState(20);
    const [reservations, setReservations] = useState([]);
    const [name, setName] = useState('');
    const [guestCount, setGuestCount] = useState('');
    const [phone, setPhone] = useState('');

    const handleReservationSubmit = (e) => {
        e.preventDefault();

        if (guestCount > seatsLeft) {
            alert('Not enough seats available!');
            return;
        }

        if (isDuplicateName(name)) {
            alert('Duplicate name, please try again.');
            return;
        }

        const newReservation = {
            name,
            phone,
            guestCount: parseInt(guestCount),
            checkInTime: new Date().toLocaleString(),
            checkedOut: false,
        };

        setReservations([...reservations, newReservation]);
        setSeatsLeft(seatsLeft - newReservation.guestCount);

        // Clear the form
        setName('');
        setGuestCount('');
        setPhone('');
    };

    const handleCheckout = (index) => {
        const updatedReservations = [...reservations];
        const reservation = updatedReservations[index];

        if (!reservation.checkedOut) {
            reservation.checkedOut = true;
            setSeatsLeft(seatsLeft + reservation.guestCount);
            setReservations(updatedReservations);
        }
    };

    const handleDelete = (index) => {
        const updatedReservations = [...reservations];
        const reservation = updatedReservations[index];
       
        if (!reservation.checkedOut) {
            setSeatsLeft(seatsLeft + reservation.guestCount);
        }

        updatedReservations.splice(index, 1);
        setReservations(updatedReservations);
    };

    const isDuplicateName = (name) => {
        return reservations.some(reservation => reservation.name === name);
    };

    return (
        <div className="container">
            <h1>Restaurant Reservation System</h1>

            <div className="reservation-form">
                <h2>Make a Reservation</h2>
                <form onSubmit={handleReservationSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Guest Count"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit">Reserve</button>
                </form>
            </div>

            <h3>Seats Left: <span>{seatsLeft}</span></h3>

            <h2>Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Check-In Time</th>
                        <th>Checkout Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{reservation.name}</td>
                            <td>{reservation.phone}</td>
                            <td>{reservation.checkInTime}</td>
                            <td>
                                {reservation.checkedOut ? 'Checked Out' :
                                    <button className="checkout" onClick={() => handleCheckout(index)}>Click to Checkout</button>
                                }
                            </td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
