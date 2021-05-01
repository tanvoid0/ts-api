import * as mongoose from 'mongoose';

class Database {
    public database: mongoose.Connection | null;
    public uri: string;

    private db_options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        poolSize: 50,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    constructor() {
        this.database = null;

        if(process.env.NODE_ENV === "production"){
            this.uri = process.env.DB_STRING_PROD || "";
        } else {
            this.uri = process.env.DB_STRING || "";
        }
    }

    public connect() {
        if(this.database) {
            return;
        }
        mongoose.connect(this.uri, this.db_options).then(result => {
            console.log("Connected to database");
        }).catch(error => {
            console.log("Error connecting to mongodb", error);
        });

        this.database = mongoose.connection;
    }

    public async disconnect() {
        if (!this.database) {
            return;
        }
        await mongoose.disconnect();
    }
}

const db = new Database();
export default db;