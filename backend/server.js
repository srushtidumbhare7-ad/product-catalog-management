const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


//connect to mongodb atlas
mongoose.connect('mongodb+srv://srushtidumbhare2605_db_user:Eo3ErKL99KiTKvcc@cluster0.cs8eec1.mongodb.net/?appName=Cluster0')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('DB connection error: ', err));

// default route
app.get('/', (req, res) => {
res.send('Product Catalog Backend Running...');
});

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

