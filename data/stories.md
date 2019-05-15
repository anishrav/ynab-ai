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
 
## story_month
* greet
 - utter_name
* time_activity
 - action_activity
* goodbye
 - utter_goodbye
 
## Generated Story 6707828763218560846
* greet
    - utter_name
* name{"name": "anish"}
    - slot{"name": "anish"}
    - utter_greet
* time_activity
    - action_activity

## Generated Story -8603774743246044296
* greet
    - utter_name
* name{"name": "Anish"}
    - slot{"name": "Anish"}
    - utter_greet
* time_activity
    - action_activity
* goodbye
    - utter_goodbye

## Generated Story 3475280476707491502
* time_activity
    - action_activity

## Generated Story -3561406666104549948
* name{"name": "Robert"}
    - slot{"name": "Robert"}
    - utter_greet
* time_activity{"budget_action": "spend", "time_unit": "week"}
    - slot{"budget_action": "spend"}
    - action_activity
* time_activity{"time_unit": "month"}
    - action_activity
* time_activity{"time_count": "two", "time_unit": "week"}
    - action_activity
* time_activity{"budget_action": "budget", "time_unit": "month"}
    - slot{"budget_action": "budget"}
    - action_activity
* time_activity{"budget_action": "spend"}
    - slot{"budget_action": "spend"}
    - action_activity

## Generated Story 6854759223364609786
* name{"name": "robert"}
    - slot{"name": "robert"}
    - utter_greet
* time_activity{"budget_action": "spend", "time_unit": "year"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "year"}

## Generated Story 2923123503699977302
* time_activity{"budget_action": "spend", "time_unit": "year"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "year"}
    - action_activity
* time_activity{"budget_action": "budget"}
    - slot{"budget_action": "budget"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "week"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "week"}
    - action_activity
* time_activity{"budget_action": "budget", "time_unit": "month"}
    - slot{"budget_action": "budget"}
    - slot{"time_unit": "month"}

## Generated Story 4639202911609637580
* greet
    - utter_name
* name{"name": "anish"}
    - slot{"name": "anish"}
    - utter_greet
* time_activity{"budget_action": "spend", "time_unit": "week"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "week"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "week"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "week"}
    - action_activity
* time_activity{"budget_action": "budget", "time_unit": "year"}
    - slot{"budget_action": "budget"}
    - slot{"time_unit": "year"}
    - action_default_fallback
    - rewind
* time_activity{"budget_action": "budget", "time_unit": "month"}
    - slot{"budget_action": "budget"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend"}
    - slot{"budget_action": "spend"}
    - action_activity
* time_activity{"budget_action": "spend"}
    - slot{"budget_action": "spend"}
    - action_activity
* time_activity{"budget_action": "budget", "time_unit": "year"}
    - slot{"budget_action": "budget"}
    - slot{"time_unit": "year"}
    - action_activity
* time_activity{"budget_action": "spend"}
    - slot{"budget_action": "spend"}
    - action_activity
* time_activity{"budget_action": "spend"}
    - slot{"budget_action": "spend"}
    - action_activity

## Generated Story -5902799975601714862
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_count": "2", "time_unit": "week"}
    - slot{"budget_action": "spend"}
    - slot{"time_count": "2"}
    - slot{"time_unit": "week"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_count": "2", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_count": "two"}
    - slot{"time_unit": "month"}
    - action_activity
* time_activity{"budget_action": "spend", "time_count": "2", "time_unit": "month"}
    - slot{"budget_action": "spend"}
    - slot{"time_count": "2"}
    - slot{"time_unit": "month"}
    - action_activity

