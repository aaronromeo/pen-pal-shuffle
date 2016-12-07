curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Pen Pal Shuffle! The old school way to meet people for the new school!"
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=" + $PAGE_ACCESS_TOKEN
