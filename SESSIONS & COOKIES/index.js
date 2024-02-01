var express = require("express");
var app = express();
const session = require("express-session");
const marketroute = require('./Routes/Market');
const AuthRoute = require("./Routes/Auth");

app.use(session({
    secret: 'mySuperSecretKey$%^&*()',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

app.use('/auth', AuthRoute);



app.get('/cart', (req, res) => {
    if (req.session.cart) {
        res.send(req.session.cart);
    } else {
        res.send("You have no cart");
    }
});

app.post('/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    console.log(cartItem);
    const cart = req.session.cart;

    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [cartItem],
        };
    }

    res.status(201).send(req.sessionID);
});

app.use(marketroute);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
