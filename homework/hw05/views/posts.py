import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids, can_view_post


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        try:
             count = int(request.args.get("limit", 20))
        
             if count > 50:
                  return Response(json.dumps({"Message":"Limit request is maxed out at 50, please try again"}),
                                   mimetype="application/json", 
                                   status=400)
        except:
           return Response(json.dumps({"Message":"Request must be an integer"}),
                                   mimetype="application/json", 
                                   status=400)
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(count)

        # TODO: add the ability to handle the "limit" query parameter:

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        #if user has given req data
        #create new post record in the posts
        #table

        #required data:
        #image url
        #optional: caption, alt text
        data = request.json
        print(data)
        image_url = data.get("image_url")
        caption = data.get("caption")
        alt_text=data.get("alt_text")

        if not image_url:
              return Response(json.dumps(({"Message":"Image url is required for this operation"})), 
                              mimetype="application/json", 
                              status=400)


        #1. create
        new_post = Post(
            image_url=image_url,
            user_id=self.current_user.id, # must be a valid user_id or will throw an error
            caption=caption,
            alt_text=alt_text
        )
       
        #validate data
        #insert into the database, return newly created resource
        #back to the user with a 201 code
        return Response(json.dumps(new_post.to_dict(user=self.current_user)), 
                        mimetype="application/json", 
                        status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        

    def patch(self, id):
        print("POST id=", id)
        can_view= can_view_post(id, self.current_user)
        if(can_view):
            #query for the post and return it 
            #else,
            
            post = Post.query.filter_by(id=id).first()
        #should update the post
            data = request.json
            if "image_url" in data and data["image_url"] is not None:
                post.image_url= data["image_url"]
            if "caption" in data and data["caption"] is not None:
                post.caption= data["caption"]
            if "alt_text" in data and data["alt_txt"] is not None:
                post.alt_text= data["alt_text"]

            db.session.commit()

            return Response(json.dumps({data}), mimetype="application/json", status=200)
        else:
            return Response(
                json.dumps({"message": f"Post id={id} not found"}),
                mimetype="application/json",
                status=404,
        )


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
                Post.query.filter_by(id=id).delete()
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
    

    def get(self, id):
        can_view= can_view_post(id, self.current_user)
        if(can_view):
            #query for the post and return it 
            #else,
            post = Post.query.get(id)
            return Response(
                json.dumps(post.to_dict(user=self.current_user)),
                mimetype="application/json",
                status=200,
        )
        else:
            return Response(
                json.dumps({"message": f"Post id={id} not found"}),
                mimetype="application/json",
                status=404,
        )


      

def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
