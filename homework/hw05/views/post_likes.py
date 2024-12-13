import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from views import can_view_post


class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
       data = request.json
       print(data)
       post_id =  data.get("post_id")
        
       try:
            post_id = int(post_id)
           
       except :
            return Response(
                json.dumps({"Message": "Post id must be a valid integer"}),
                mimetype="application/json",
                status=404,
            )
        
       user_id = self.current_user.id
       
       
       post = LikePost.query.filter_by(id=post_id).first()
       if not post:
            return Response(
                json.dumps({"Message": f"Post id {post_id} does not exist"}),
                mimetype="application/json",
                status=404,
            )
       can_view = can_view_post(post_id,self.current_user)
       if not can_view:
                return Response(
                json.dumps({"Message": "Not auth"}),
                mimetype="application/json",
                status=404,
            )  
       
      
       existing_like = LikePost.query.filter_by(post_id=post_id).first()

       if existing_like:
            return Response(
                 json.dumps({"Message": f"Post id {post_id} is already liked by the user"}),
                 mimetype="application/json",
                 status=400,
             )

       new_like = LikePost(
            post_id=post_id,
            user_id=user_id
           
        ) 
       db.session.add(new_like)    # issues the insert statement
       db.session.commit() 
       return Response(
            json.dumps(new_like.to_dict()),
            mimetype="application/json",
            status=201,
        )



class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        can_view= can_view_post(id, self.current_user)
        if(can_view):
             if not id:
                return Response(
                    json.dumps({"Message":f"User id={id} does not exist"}),
                    mimetype="application/json",
                    status=404,
                )
             else:
                LikePost.query.filter_by(id=id).delete()
                db.session.commit()
                return Response(
                    json.dumps({}),
                    mimetype="application/json",
                    status=200,
                )
        else:
             return Response(
                    json.dumps({"Message":"Access denied"}),
                    mimetype="application/json",
                    status=404,
                )


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
