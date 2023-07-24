from pymongo import MongoClient


# Replace 'my_mongodb_uri' with the actual URI for your MongoDB database
# For example: 'mongodb://localhost:27017/my_database'

mongo_uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1'
client = MongoClient(mongo_uri)
db = client.my_database   # Change 'my_database' to your desired database name



users_collection = db.users
plants_collection = db.users
