import express from 'express';
import { 
    createRoom, 
    bookRoom, 
    listAllRooms, 
    listAllCustomers, 
    bookingStats 
} from '../Controllers/hall_room.controller.js';

const router = express.Router();

// Route for creating a room
router.post('/create-room', createRoom);

// Route for booking a room
router.post('/book-room', bookRoom);

// Route for listing all rooms with booking data
router.get('/rooms', listAllRooms);

// Route for listing all customers with booking data
router.get('/customers', listAllCustomers);

// Route for getting booking stats for a customer
router.get('/booking-stats', bookingStats);

export default router;
