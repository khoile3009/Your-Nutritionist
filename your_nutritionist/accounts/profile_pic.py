from django.contrib.auth.models import User
from .models import UserProfilePic
from rest_framework import generics, permissions
from utils.files import GCLOUD
from django.http import JsonResponse

def get_user_profile_picture(request, *args, **kwargs):
    if(request.method == 'GET'):
        user_id = kwargs['user_id']
        try:
            user_instance = User.objects.get(id = user_id)
            profile_pic_instance = UserProfilePic.objects.get(user = user_instance)
            return JsonResponse({'url':profile_pic_instance.url}, safe=True)
        except User.DoesNotExist:
            return JsonResponse({'status':'No User'}, status=404)
        except UserProfilePic.DoesNotExist:
            return JsonResponse({'status':'No Profile Picture'}, status=404)

    
    
class ProfilePicAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def put(self, *args, **kwargs):
        profile_pic_url = self.request.POST.get('url')

        if(not profile_pic_url or profile_pic_url == ''):
            if(len(self.request.FILES) > 0):
                print(profile_pic_url)
                media_id_map = [0]
                urls, bucket_path = GCLOUD.upload_and_return_url(self.request.user.id, self.request.FILES, media_id_map)
                print(urls)
                try:
                    profile_pic_instance = UserProfilePic.objects.get(user=self.request.user)
                    if(profile_pic_instance.gcloud_bucket_url != ''):
                        GCLOUD.delete_bucket_url(profile_pic_instance.gcloud_bucket_url)
                    profile_pic_instance.url = urls[0]
                    profile_pic_instance.gcloud_bucket_url = bucket_path[0]
                    profile_pic_instance.save()
                except:
                    UserProfilePic.objects.create(
                        user = self.request.user,
                        url = urls[0],
                        gcloud_bucket_url = bucket_path[0]
                    )
                return JsonResponse({'url': urls[0]}, safe=True)
            else:
                return JsonResponse({'status': 'No file_input'})
        else:
            try:
                profile_pic_instance = UserProfilePic.objects.get(user=self.request.user)
                if(profile_pic_instance.gcloud_bucket_url != ''):
                    GCLOUD.delete_bucket_url(profile_pic_instance.gcloud_bucket_url)
                profile_pic_instance.url = profile_pic_url
                profile_pic_instance.gcloud_bucket_url = ''
                profile_pic_instance.save()
            except:
                UserProfilePic.objects.create(
                    user = self.request.user,
                    url = profile_pic_url,
                    gcloud_bucket_url = ''
                )
            return JsonResponse({'url': profile_pic_url}, safe=True)

    def post(self, *args, **kwargs):
        profile_pic_url = self.request.POST.get('url')
        if(not profile_pic_url and profile_pic_url == ''):
            if(len(self.request.FILES) > 0):
                media_id_map = [0]
                urls, bucket_path = GCLOUD.upload_and_return_url(self.request.user.id, self.request.FILES, media_id_map)
                try:
                    profile_pic_instance = UserProfilePic.objects.get(user=self.request.user)
                    return JsonResponse({'status': 'Already existed'}, status=405)
                except:
                    UserProfilePic.objects.create(
                        user = self.request.user,
                        url = urls[0],
                        gcloud_bucket_url = bucket_path[0]
                    )
                    return JsonResponse({'url': urls[0]}, safe=True)
            else:
                return JsonResponse({'status': 'No file_input'})
        else:
            try:
                profile_pic_instance = UserProfilePic.objects.get(user=self.request.user)
                return JsonResponse({'status': 'Already existed'}, status=405)
            except:
                UserProfilePic.objects.create(
                    user = self.request.user,
                    url = profile_pic_url,
                    gcloud_bucket_url = ''
                )
                return JsonResponse({'url': profile_pic_url}, safe=True)
    
    def delete(self, *args, **kwargs):
        UserProfilePic.objects.filter(user = self.request.user).delete()
        return JsonResponse({'status':'ok'}, safe=True)