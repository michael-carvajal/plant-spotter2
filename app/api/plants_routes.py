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
