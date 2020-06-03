def hashtag_filter(word):
    if('#' in word):
        return True
    else:
        return False
    


def get_hashtag_from_description(description):
    words = description.split(' ')
    hashtag_words = filter(hashtag_filter, words)
    hashtags = []
    for hashtag_word in hashtag_words:
        for word in hashtag_word.split('#')[1:]:
            hashtags.append(word)
    return hashtags