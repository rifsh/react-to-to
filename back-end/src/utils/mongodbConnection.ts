import mongoose from 'mongoose';

export function dbConnection() {
    mongoose.connect(process.env.DB_URL, {
        dbName: 'To-do-app'
    }).then(() => {
        console.log('Mongodb connected');
    }).catch((err) => {
        console.log(err);

    })
}