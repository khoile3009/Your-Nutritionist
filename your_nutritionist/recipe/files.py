from google.cloud import storage
import os
from datetime import timedelta, datetime


class GCLOUD:


    @staticmethod
    def upload_and_return_url(user_id,files, media_ids_map):
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\gcloud\gcloud_privatekey.json'
        client = storage.Client()
        bucket = client.get_bucket('mediastorage-cookery')
        urls = []
        bucket_paths = []
        i = 0
        for name,file in files.items():
            if(i not in media_ids_map):
                urls.append(None)
            else:
                gcloud_file_name = GCLOUD.__viable_file_name(bucket, str(user_id) + '/' + file.name)
                blob = bucket.blob(gcloud_file_name)
                blob.upload_from_file(file, content_type=file.content_type)
                signed_url = blob.generate_signed_url(datetime.max)
                urls.append(signed_url)
                bucket_paths.append(gcloud_file_name)
        return urls, bucket_paths

    @staticmethod
    def __viable_file_name(bucket, file_name):
        splitted_file_name = os.path.splitext(file_name)
        if(bucket.get_blob(file_name) == None):
            return file_name
        else:
            i = 1
            while(bucket.get_blob(splitted_file_name[0] + '(' + str(i) + ')' + splitted_file_name[1]) != None):
                i+=1
        return splitted_file_name[0] + '(' + str(i) + ')' + splitted_file_name[1]

    # @staticmethod
    # def get_signed_url(public_path):
    #     os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\gcloud\gcloud_privatekey.json'
    #     client = storage.Client()
    #     bucket = client.get_bucket('mediastorage-cookery')
    #     print(public_path)
    #     blob = bucket.get_blob(public_path)
    #     return blob.generate_signed_url(datetime.now() + timedelta(1))

    @staticmethod
    def delete_media(sender, instance, **kwargs):
        if(instance.media_type in [1,3]):
            os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\gcloud\gcloud_privatekey.json'
            client = storage.Client()
            bucket = client.get_bucket('mediastorage-cookery')
            blob = bucket.get_blob(instance.gcloud_bucket_url)
            if(blob):
                blob.delete()



    