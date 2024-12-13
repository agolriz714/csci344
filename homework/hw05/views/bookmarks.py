import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import can_view_post


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        bookmark = Bookmark.query.filter(Bookmark.user_id == self.current_user.id)
        data = [item.to_dict() for item in bookmark.all()]
        print(data)
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )

    def post(self):
        """
        +first grab post id
       +then check is id real
        does user have access to view post
        has user already bookmarked
        if all true, create bookmark
        """
        #post a bookmark, will need add functions
        data = request.json
        print(data)
        

        post_id =  data.get("post_id")
        
        try:
            post_id = int(post_id)
           
        except :
            return Response(
                json.dumps({"Message": "Post id must be a valid integer"}),
                mimetype="application/json",
                status=400,
            )
        
        user_id = self.current_user.id
       
       
        post = Post.query.get(post_id)
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
      
        existing_bookmark = Bookmark.query.filter_by(post_id=post_id).filter_by(user_id=self.current_user.id).first()

        if existing_bookmark:
            return Response(
                 json.dumps({"Message": f"Post id {post_id} is already marked by the user"}),
                 mimetype="application/json",
                 status=400,
             )

        
      
        new_bookmark = Bookmark(
            post_id=post_id,
            user_id=user_id
           

        ) 
        db.session.add(new_bookmark)    # issues the insert statement
        db.session.commit() 
        return Response(
            json.dumps(new_bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        
        print(id)
        if not id:
                return Response(
                    json.dumps({"Message":f"User id={id} does not exist"}),
                    mimetype="application/json",
                    status=404,
                )
        can_view= can_view_post(id, self.current_user)
        if(can_view):
            
                Bookmark.query.filter_by(id=id).delete()
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
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
# can_view = can_view_post(self.current_user,data.get("id"))
#         if(can_view):
#             post_id =  data.get("post_id")
        
#             try:
#                 post_id = int(post_id)
           
#             except :
#                 return Response(
#                     json.dumps({"Message": "Post id and/or user id must be a valid integer"}),
#                     mimetype="application/json",
#                     status=400,
#                 )
        
#             user_id = self.current_user.id
       
#             post = Bookmark.query.filter_by(id=post_id).first()
#             if not post:
#                 return Response(
#                     json.dumps({"Message": f"Post id {post_id} does not exist"}),
#                     mimetype="application/json",
#                     status=404,
#                 )
        
       
#         # Check if the post_id already exists for the current user in the Bookmark table
#             existing_bookmark = Bookmark.query.filter_by(post_id=post_id).first()

#             if existing_bookmark:
#                 return Response(
#                     json.dumps({"Message": f"Post id {post_id} is already marked by the user"}),
#                      mimetype="application/json",
#                     status=400,  # You can return 400 (Bad Request) instead of 404
#                  )
#             new_bookmark = Bookmark(
#                 post_id=post_id,
#                 user_id=user_id
           
#             ) 
#             db.session.add(new_bookmark)    # issues the insert statement
#             db.session.commit() 
#             return Response(
#                 json.dumps(new_bookmark.to_dict()),
#                 mimetype="application/json",
#                 status=201,
#             )
#         else:
#             return Response(
#                 json.dumps({"Message":"User does not have proper auth"}),
#                 mimetype="application/json",
#                 status=400,
#         )
