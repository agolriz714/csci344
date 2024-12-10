import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.comment import Comment
from views import can_view_post


class CommentListEndpoint(Resource):

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
                json.dumps({"Message": "Post id and/or user id must be a valid integer"}),
                mimetype="application/json",
                status=400,
            )
        
        user_id = self.current_user.id
        text = data.get("text")
        if not text:
            return Response(
                json.dumps({"Message": "A text string is required to comment"}),
                mimetype="application/json",
                status=400,
            )
       
       
        post = Comment.query.filter_by(id=post_id).first()
        if not post:
            return Response(
                json.dumps({"Message": f"Post id {post_id} does not exist"}),
                mimetype="application/json",
                status=404,
            )
    
        
      
        new_comment = Comment(
            post_id=post_id,
            user_id=user_id,
            text= text
           

        ) 
        db.session.add(new_comment)    # issues the insert statement
        db.session.commit() 
        return Response(
            json.dumps(new_comment.to_dict()),
            mimetype="application/json",
            status=201,
        )


class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        
        print(id)
        
        can_view= can_view_post(id, self.current_user)
        if(can_view):
            if not id:
                return Response(
                    json.dumps({"Message":f"User id={id} does not exist"}),
                    mimetype="application/json",
                    status=404,
                )
            Comment.query.filter_by(id=id).delete()
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
        CommentListEndpoint,
        "/api/comments",
        "/api/comments/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        CommentDetailEndpoint,
        "/api/comments/<int:id>",
        "/api/comments/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
