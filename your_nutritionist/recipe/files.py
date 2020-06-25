from google.cloud import storage
import os



class GCLOUD:


    @staticmethod
    def upload_and_return_url(user_id,files):
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\Users\khoib\Projects\gcloud_privatekey.json'
        client = storage.Client()
        bucket = client.get_bucket('mediastorage-cookery')
        urls = []
        for name,file in files.items():
            print(file.content_type)
            file_name = GCLOUD.__viable_file_name(bucket, str(user_id) + '/' + file.name)
            print(file_name)
            blob = bucket.blob(file_name)
            blob.upload_from_file(file, content_type=file.content_type)
            urls.append(blob.public_url)
        return urls

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

    @staticmethod
    def get_signed_url(public_path):
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'gcloud_privatekey.json'
        client = storage.Client()
        bucket = client.get_bucket('mediastorage-cookery')
        # blob.get

def __viable_file_name(bucket, file_name):
    splitted_file_name = os.path.splittext(file_name)
    if(bucket.get_blob(file_name) == None):
        return file_name
    else:
        i = 1
        while(bucket.get_blob(splitted_file_name[0] + '(' + str(i) + ')' + splitted_file_name[1]) != None):
            i+=1
    return splitted_file_name[0] + '(' + str(i) + ')' + splitted_file_name[1]

    