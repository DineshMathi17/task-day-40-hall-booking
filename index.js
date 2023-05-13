const express = require('express')
const fs = require('fs')
const path = require('path');

const dirpath = path.join(__dirname);
console.log("dirpath:", dirpath)

const app = express();

app.use(express.json());

const data = [
    {
        id: "1",
        numberOfSeats: "100",
        amenities: ["AC", "chairs", "discolights"],
        price: 5200,
        isBooked: "true",
        customerName: "Dinesh",
        BookingDate:"09-04-2023",
        date: "10-04-2023",
        startTime: "10-04-2023 at 12pm",
        endTime: "11-04-2023 at 12pm",
        RoomId: 66,
        RoomName: "Duplex",
    },
    {
        id: "2",
        numberOfSeats: "100",
        amenities: ["AC", "chairs", "discolights"],
        price: 5200,
        isBooked: "false",
        customerName: "Bhuvanesh",
        BookingDate:"09-04-2023",
        date: "12-04-2023",
        startTime: "12-04-2023 at 12pm",
        endTime: "13-04-2023 at 11pm",
        RoomId: 77,
        RoomName: "normal",
    },
    {
        id: "3",
        numberOfSeats: "100",
        amenities: ["AC", "chairs", "discolights"],
        price: 5200,
        isBooked: "true",
        customerName: "sai",
        BookingDate:"14-04-2023",
        date: "15-04-2023",
        startTime: "15-04-2023 at 12pm",
        endTime: "17-04-2023 at 10pm",
        RoomId: 88,
        RoomName: "Duplex",
    },
    {
        id: "4",
        numberOfSeats: "100",
        amenities: ["AC", "chairs", "discolights"],
        price: 5200,
        isBooked: "false",
        customerName: "kannan",
        BookingDate:"16-04-2023",
        date: "18-04-2023",
        startTime: "18-04-2023 at 12pm",
        endTime: "19-04-2023 at 12pm",
        RoomId: 99,
        RoomName: "normal",
    }
]

app.get('/', (req, res) => {
   res.send("Hall Booking");
})

//1.create a room
app.post('/hall/create', (req, res) => {
    const createHall = {
        id: data.length + 1,
        numberOfSeats:req.body.numberOfSeats,
        amenities:req.body.amenities ,
        price:req.body.price,
        RoomName: "Duplex",
        isBooked: "false",
        customerName:"",
        date: "",
        startTime: "",
        endTime:"",
        RoomId:""
       
    }
    data.push(createHall);
    res.send(createHall);
})

app.get('/hall/rooms', (req, res) => {
    let filterHall = data;
    filterHall = filterHall.filter((halls) => halls.isBooked === "true")
    let roomsData = filterHall.map((room) => {
        let bookedDetailes = {
            id: room.id,
            RoomName: room.RoomName,
            isBooked: room.isBooked,
            customerName: room.customerName,
            date: room.date,
            startTime: room.startTime,
            endTime: room.endTime
        };
        return bookedDetailes
    });
    res.send(roomsData);
})
//4.list all customers with booked data
app.get('/hall/customer', (req, res) => {

    let filterHall = data;
    filterHall = filterHall.filter((halls) => halls.isBooked === "true")
    let customersData = filterHall.map((room) => {
        let bokkedDetailes = {
            id: room.id,
            customerName: room.customerName,
            RoomName: room.RoomName,
            date: room.date,
            startTime: room.startTime,
            endTime: room.endTime
        };
        return bokkedDetailes
    });
    res.send(customersData);
})

//5.how many times a customer has booked
app.get('/hall/customer/times', (req, res) => {
    if (req.query) {
        const { customername } = req.query;
        let filterHall = data;
        filterHall = filterHall.filter((halls) => halls.customerName === customername)
        let customersData = filterHall.map((room) => {
            let bookedDetailes = {
                customerName: room.customerName,
                RoomName: room.RoomName,
                date: room.date,
                startTime: room.startTime,
                endTime: room.endTime,
                BookingId: room.RoomId,
                BookingDate: room.BookingDate,
                BookingStatus: room.isBooked,
                
            };
            return bookedDetailes
        });
        res.send(`number of time booked:${customersData.length} \n\n ${JSON.stringify(customersData)}`).json()
    }else{
        res.status(400).send("Add a customer name in endpoint ")
    }
})
//getind id
app.get('/hall/details/:id', (req, res) => {
    const { id } = req.params;
    if(id>0 && id<=data.length){
    const specificHall = data.find(hall => hall.id === id);
    res.send(specificHall)
    }else{
        res.send('Enter valied id')
    }
})

//2.Booking hall

app.post('/hall/book', (req, res) => {
    const newHall = {
        id: data.length + 1,
        numberOfSeats:"100",
        amenities: ["AC", "chairs", "discolights"],
        price:7599,
        RoomName: "Duplex",
        isBooked: "true",
        customerName: req.body.customerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        RoomId:req.body.RoomId
    }
    
    data.push(newHall);
    res.send(data);

})
//edit hall booking
app.put('/hall/book', (req, res) => {
    const { id } = req.params;
    const halls = data.find(hall => hall.id === id);

    if (halls.isBooked == "true") {
        res.status(400).send("Sorry the hall is already booked")
    } else {
        halls.customerName = req.body.customerName,
            halls.date = req.body.date,
            halls.startTime = req.body.startTime,
            halls.endTime = req.body.endTime,
            halls.isBooked = req.body.isBooked,
            res.status(200).send(data);
    }
})



app.listen(9000, () => (console.log("localhost:9000")));