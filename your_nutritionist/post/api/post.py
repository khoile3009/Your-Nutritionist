from accounts.helpers import get_profile_pic
from ..models import PostMedia
from utils.files import GCLOUD
from social.apis.like_api import get_number_of_like
from social.models import Like
def get_post_info(post_instance,user):
    post_info = {}
    post_info['profilepic'] = get_profile_pic(post_instance.creator.id)
    post_info['user_id'] = post_instance.creator.id
    post_info['username'] = post_instance.creator.username
    post_info['fullname'] = post_instance.creator.get_full_name()
    post_info['content'] = post_instance.content
    post_info['created_at'] = post_instance.created_at.date()
    post_info['post_id'] = post_instance.id
    if(user.is_anonymous):
        post_info['liked'] = False
    else:
        try:
            Like.objects.get(target_post = post_instance, from_user = user)
            post_info['liked'] = True
        except Like.DoesNotExist:
            post_info['liked'] = False
    post_info['num_like'] = get_number_of_like(post_instance)
    media_instances = PostMedia.objects.filter(post=post_instance)
    post_info['medias'] = []
    for media_instance in media_instances:
        post_info['medias'].append(
                {
                    'url': media_instance.url,
                    'type': media_instance.media_type
                }
            )
    return post_info

def create_post_from_post_info(post_data, files, user):
    post_info = json.loads(post_data)
    if(post_info):
        media_ids_map = [media['fileId'] if(media['type'] in [1,3]) else None for media in post_info["medias"]]
        urls, bucket_paths = GCLOUD.upload_and_return_url(user.id,files, media_ids_map)
        post_instance = Post.objects.create(
            creator = user,
            content = post_info['content']
        )
        for index in range(len(post_info['medias'])):
            media =  post_info['medias'][index]
            if(media['fileId'] != -1):
                media['url'] = urls[media['fileId']]
                media['gcloud_bucket_url'] = bucket_paths[media['fileId']]
            else:
                media['gcloud_bucket_url'] =''
            media_instance = PostMedia.objects.create(
                post=post_instance,
                url = media['url'],
                gcloud_bucket_url = media['gcloud_bucket_url'],
                media_type = media['type'],
                order = index
            )  
        return JsonResponse({'status':'ok'}, safe=True)
    else:
        return JsonResponse({'status':'Post data missing'},status=422)

def edit_post_medias(post_instance, media_section, media_instances, urls, bucket_paths):
    for index in range(len(media_section)):
        media = media_section[index]
        media_instance = media_instances.filter(order=index)
        if(not media.get('media_id')):
            media_instance.delete()
            if(media['fileId'] != -1):
                media['url'] = urls[media['fileId']]
                media['gcloud_bucket_url'] = bucket_paths[media['fileId']]
            else:
                media['gcloud_bucket_url'] =''
            media_instance = PostMedia.objects.create(
                post = post_instance,
                url = media['url'],
                media_type = media['type'],
                gcloud_bucket_url = media['gcloud_bucket_url'],
                order = index
            )
    media_instances.filter(order__in= list(range(len(media_section), media_instances.count()))).delete()
