import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("practice/weatherforecast-184a2-firebase-adminsdk-71lu5-ab8613b066.json")
app =firebase_admin.initialize_app(cred)
db = firestore.client()

result = db.collection("melingo").document("8RF5lgZ4WezxHJMCGriD").get()
# artist = result.to_dict()
artist_name = result.to_dict()["artist"]
track_name = result.to_dict()["song"]
