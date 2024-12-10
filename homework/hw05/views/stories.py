import json

from flask import Response
from flask_restful import Resource

from models.story import Story
from views import get_authorized_user_ids


class StoriesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        id_of_me_and_others = get_authorized_user_ids(self.current_user)
       
        story = Story.query.filter(Story.user_id.in_(id_of_me_and_others))

       

        data = [item.to_dict() for item in story.all()]
        
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        StoriesListEndpoint,
        "/api/stories",
        "/api/stories/",
        resource_class_kwargs={"current_user": current_user},
    )
