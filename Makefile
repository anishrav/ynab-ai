.PHONY: clean train-nlu train-core cmdline server

TEST_PATH=./

help:
	@echo "    clean"
	@echo "        Remove python artifacts and build artifacts."
	@echo "    train-nlu"
	@echo "        Trains a new nlu model using the projects Rasa NLU config"
	@echo "    train-core"
	@echo "        Trains a new dialogue model using the story training data"
	@echo "    action-server"
	@echo "        Starts the server for custom action."
	@echo "    cmdline"
	@echo "       This will load the assistant in your terminal for you to chat."


clean:
	pkill -f 'python -m rasa_core_sdk.endpoint --actions actions'
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f  {} +
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info
	rm -rf docs/_build

train-nlu:
	python -m rasa_nlu.train -c nlu_config.yml --data data/nlu.md -o models --fixed_model_name nlu --project current --verbose

train-core:
	python -m rasa_core.train -d domain.yml -s data/stories.md -o models/current/dialogue -c policies.yml

cmdline:
	python -m rasa_core.run -d models/current/dialogue -u models/current/nlu --endpoints endpoints.yml 
	
action-server:
	nodemon action-server

int:
	python -m rasa_core.train interactive -o models/dialogue -d domain.yml -c policies.yml -s data/stories.md --nlu models/current/nlu --endpoints endpoints.yml 

check:
	ps -fA | grep python
run:
	make train-nlu
	make train-core
	make action-server
	make cmdline