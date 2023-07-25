from flask import jsonify, request, Blueprint
from bson import ObjectId
from ..mongoDB import  plants_collection
from .utils import make_serializable

plants_routes = Blueprint('plants', __name__)


@plants_routes.route('', methods=['GET', 'POST'])
def handle_plants():
    print('inside plants route')
    if request.method == 'GET':
        data = list(plants_collection.find())
        return jsonify(make_serializable(data))  # Convert ObjectId to string before returning

    data = request.get_json()
    print('data from request ================> ', data)
    plants_collection.insert_one(data)
    return jsonify({'message': 'Plant created successfully'})


@plants_routes.route('/<string:_id>', methods=['PUT', 'DELETE'])
def handle_single_user(_id):
    print('id of the single user  ==== = = = >', _id)


    if request.method == 'DELETE':
        plant = plants_collection.find_one_and_delete({"_id": ObjectId(_id)})  # Use find_one() to get a single document

    if request.method == 'PUT':
        data = request.get_json()
        plant = plants_collection.find_one_and_replace({"_id": ObjectId(_id)}, data)  # Use find_one() to get a single document
        print('data ====> ', data)
        print('plant ======> ', plant)

    print('plant detail from query ====> ', plant)


    if plant:
        plant['_id'] = str(plant['_id'])  # Convert the '_id' field to a string
        return jsonify(plant)
    else:
        return jsonify({'message': 'plant not found'}), 404
