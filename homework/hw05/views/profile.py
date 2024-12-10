import json

from flask import Response, request
from flask_restful import Resource


def get_path():
    return request.host_url + "api/posts/"


class ProfileDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
       
        thumb_url = self.current_user.thumb_url
        username = self.current_user.username
        id = self.current_user.id
        first_name = self.current_user.first_name
        last_name = self.current_user.last_name
        email = self.current_user.email
        image_url = self.current_user.image_url
    # Create a dictionary to hold the data
        data = {
            "thumb_url": thumb_url,
            "username": username,
            "id": id,
            "first_name":first_name,
            "last_name":last_name,
            "email":email,
            "image_url": image_url
        }

        return Response(
            json.dumps(data),  # Return the actual data as the response body
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        ProfileDetailEndpoint,
        "/api/profile",
        "/api/profile/",
        resource_class_kwargs={"current_user": current_user},
    )
