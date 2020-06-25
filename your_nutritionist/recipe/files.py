from google.cloud import storage
import os

class GCLOUD:

    @staticmethod
    def upload_and_return_url(user_id,files):
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\Users\khoib\Projects\cookery-281115-d71bfc9ab974.json'
        client = storage.Client()
        bucket = client.get_bucket('mediastorage-cookery')
        urls = []
        for name,file in files.items():
            print(file.content_type)
            blob = bucket.blob(str(user_id) + '/' + file.name)
            blob.upload_from_file(file, content_type=file.content_type)
            urls.append('https://media.w3.org/2010/05/sintel/trailer_hd.mp4')
        return urls



    @staticmethod
    def get_signed_url():
        pass

# def __viable_file_name(bucket, file_name):
#     if(bucket.get_blob(file_name) == None):
#         return file_name
#     else:
#         i = 1
#         while()
    