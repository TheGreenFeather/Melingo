import requests
from lyrics_api import base_url, lyrics_matcher ,format_url , artist_search_parameter , track_search_parameter  ,api_key
from getdata import artist_name, track_name


api_call = base_url + lyrics_matcher + format_url + artist_search_parameter + artist_name + track_search_parameter + track_name +api_key
request = requests.get(api_call)
data = request.json()
data = data["message"]["body"]

result = data["lyrics"]["lyrics_body"] #đây nè cha 

print(result)


#follow me