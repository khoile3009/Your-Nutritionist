from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics, permissions
from django.contrib.auth.models import User
import json
from post.models import Post, PostMedia
from utils.files import GCLOUD
from .post import *


class PostCreateAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    def post(self, *args, **kwargs):
        return create_post_from_post_info(self.request.POST.get('post'),self.request.FILES,self.request.user)

class PostAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    def get(self, *args, **kwargs):
        try:
            post = Post.objects.get(id=kwargs['post_id']) 
            post_info = get_post_info(post)
            print(post_info)
            return JsonResponse(post_info, safe=True)
        except Post.DoesNotExist:
            return JsonResponse({'status':'Not found'}, status=404)

    def delete(self, *args, **kwargs):
        try:
            post_instance = Post.objects.get(id=kwargs['post_id'])
            if(post_instance.creator.id == self.request.user.id): 
                post_instance.delete()
                return JsonResponse({'status':'ok'}, safe=True)
            else:
                return JsonResponse({'status':'Not authorized'}, status=405)
        except Post.DoesNotExist:
            return JsonResponse({'status':'Not found'}, status=404)

    def put(self, *args, **kwargs):  
        #post exist checking
        try:
            post_instance = Post.objects.get(id=kwargs['post_id'])
            #creator checking
            if(post_instance.creator.id == self.request.user.id):
                post_info = json.loads(self.request.POST.get('post'))
                #data checking
                if(post_info):
                    media_ids_map = [media['fileId'] if(media['type'] in [1,3]) else None for media in post_info["medias"]]
                    urls, bucket_paths = GCLOUD.upload_and_return_url(self.request.user.id,self.request.FILES, media_ids_map)
                    post_instance.content = post_info['content']
                    post_instance.save()
                    media_instances = PostMedia.objects.filter(post=post_instance)
                    edit_post_medias(post_instance,post_info['medias'],media_instances, urls,bucket_paths)
                    return JsonResponse(post_info, safe=True)
                else:
                    return JsonResponse({'status':'Post data missing'},status=422)
            else:
                return JsonResponse({'status':'Not authorized'}, status=405)
        except Post.DoesNotExist:
            return JsonResponse({'status':'Not found'}, status=404)

class PostQueryAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    
    def get(self, *args, **kwargs):
        if(self.request.GET.get('type') == 'user'):
            if(not self.request.user.is_anonymous):
                context = {'posts': []}
                post_instances = Post.objects.filter(user=self.request.user)
                for post_instance in post_instances:
                    context['posts'].append(get_post_info(post_instance))
                return JsonResponse(context, safe=True)
            else:
                return JsonResponse({'status':'Not authorized'}, status=405)
