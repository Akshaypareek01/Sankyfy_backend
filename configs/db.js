import mongoose from 'mongoose'
const user ="sankyfy"
const pass="ASlpZtuoVh8YuKsz"
const url=`mongodb+srv://${user}:${pass}@cluster0.gyaiyub.mongodb.net/?retryWrites=true&w=majority`;
const connection = async () => {
  try {
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    console.log('DB CONNECTION ESTABLISHED')
  } catch (err) {
    console.log(err)
  }
}

export default connection
