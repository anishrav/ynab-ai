## story_greet <!--- The name of the story. It is not mandatory, but useful for debugging. --> 
* greet <!--- User input expressed as intent. In this case it represents users message 'Hello'. --> 
 - utter_name <!--- The response of the chatbot expressed as an action. In this case it represents chatbot's response 'Hello, how can I help?' --> 
 
## story_goodbye
* goodbye
 - utter_goodbye

## story_thanks
* thanks
 - utter_thanks
 
## story_name
* name{"name":"Sam"}
 - utter_greet

## Generated Story -3629708176157229556
* greet
    - utter_name
* name{"name": "anish"}
    - slot{"name": "anish"}
    - utter_greet
* spent_since{"budget_action": "spend", "time_unit": "month"}
    - slot{"time_unit": "month"}
    - action_spent_since

## Generated Story -1526501426899300034
* greet
    - utter_name
* name{"name": "anish"}
    - slot{"name": "anish"}
    - utter_greet
* spent_since{"budget_action": "spend", "time_unit": "month"}
    - slot{"time_unit": "month"}
    - action_spent_since
* spent_since{"time_unit": "year"}
    - slot{"time_unit": "year"}
    - action_spent_since

## Generated Story -8467333321379140495
* greet
    - utter_name
* name{"name": "anish"}
    - slot{"name": "anish"}
    - utter_greet
* spent_since{"time_count": "2", "time_unit": "week"}
    - slot{"time_count": "2"}
    - slot{"time_unit": "week"}
    - action_spent_since
* spent_since{"time_count": "4"}
    - slot{"time_count": "4"}
    - action_spent_since
* spent_since{"time_count": "3", "time_unit": "month"}
    - slot{"time_count": "3"}
    - slot{"time_unit": "month"}
    - action_spent_since
* spent_since{"time_count": "2"}
    - slot{"time_count": "2"}
    - action_spent_since
* spent_since{"time_count": "5"}
    - slot{"time_count": "5"}
    - action_spent_since

