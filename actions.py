# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import logging
import requests
import json
from rasa_core_sdk import Action

logger = logging.getLogger(__name__)

api_token = '17146f6fb9d2cb9274e173a720d319a62ca835c87e32ea44f67cc020cbb8f05a'


class ActionJoke(Action):
    def name(self):
        # define the name of the action which can then be included in training stories
        return "action_joke"

    def run(self, dispatcher, tracker, domain):
        # what your action should do
        request = json.loads(
            requests.get("https://api.chucknorris.io/jokes/random").text
        )  # make an api call
        joke = request["value"]  # extract a joke from returned json response
        dispatcher.utter_message(joke)  # send the message back to the user
        return []


class ActionActivity(Action):
    def name(self):
        # define the name of the action which can then be included in training stories
        return "action_activity"

    def run(self, dispatcher, tracker, domain):
        # what your action should do
        activity = tracker.get_slot('action')
        dispatcher.utter_message(activity)
        return []
