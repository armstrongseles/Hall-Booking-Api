const rooms = [
    { id: 1, roomName: 'room 1', seats: 50, amenities: 'Projector, Whiteboard', pricePerHour: 200 },
    { id: 2, roomName: 'room 2', seats: 20, amenities: 'Whiteboard, Teleconferencing', pricePerHour: 100 },
    { id: 3, roomName: 'room 3', seats: 30, amenities: 'Projector, Whiteboard, Videoconferencing', pricePerHour: 150 }
];
const bookings = [];

export const createRoom = (req, res) => {
    const { roomName, seats, amenities, pricePerHour } = req.body;
    const newRoom = {
        id: rooms.length + 1,
        roomName,
        seats,
        amenities,
        pricePerHour,
    };
    rooms.push(newRoom);
    res.status(201).json({ message: 'Room created successfully', data: newRoom });
};

export const bookRoom = (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    // Finding the room by ID
    const room = rooms.find(room => room.id === roomId);

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    // Check for existing bookings in the specified room
    const isRoomBooked = bookings.some(booking => {
        return booking.roomId === roomId &&
               booking.date === date &&
               ((startTime < booking.endTime && endTime > booking.startTime));
    });

    if (isRoomBooked) {
        return res.status(400).json({ message: 'Room is already booked for the specified time' });
    }
    const newBooking = {
        id: bookings.length + 1,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
    };
    bookings.push(newBooking);
    res.status(201).json({ message: 'Room booked successfully', data: newBooking });
};


export const listAllRooms = (req, res) => {
    const roomsWithBookingData = rooms.map(room => {
        const roomBookings = bookings.filter(booking => booking.roomId === room.id);
        return {
            ...room,
            bookings: roomBookings,
        };
    });
    res.status(200).json({ data: roomsWithBookingData });
};

export const listAllCustomers = (req, res) => {
    const customersWithBookingData = bookings.map(booking => {
        const room = rooms.find(room => room.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room ? room.roomName : 'Unknown',
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
        };
    });
    res.status(200).json({ data: customersWithBookingData });
};

export const bookingStats = (req, res) => {
    const { customerName } = req.query;

    const customerBookings = bookings.filter(booking => booking.customerName === customerName);

    const bookingDetails = customerBookings.map(booking => {
        const room = rooms.find(room => room.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room ? room.roomName : 'Unknown',
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.id,
            bookingDate: new Date(), 
            bookingStatus: 'Booked', 
        };
    });

  
    const bookingCount = customerBookings.length;


    res.status(200).json({
        message: 'Booking statistics retrieved successfully',
        count: bookingCount,
        data: bookingDetails
    });
};
