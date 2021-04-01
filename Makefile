SHELL := /usr/bin/env bash

FEATURE_FILES = $(shell find features -name "*.feature")
RB_FILES = $(shell find features -name "*.rb")
JS_FILES = $(shell find features -name "*.js")
JAVA_FILES = $(shell find src -name "*.java")
CS_FILES = $(shell find src -name "*.cs")

CUCUMBER_RB_JSON     = $(patsubst features/%.feature,features/%.feature.rb.json,$(FEATURE_FILES))
CUCUMBER_JS_JSON     = $(patsubst features/%.feature,features/%.feature.js.json,$(FEATURE_FILES))
CUCUMBER_JAVA_JSON   = $(patsubst features/%.feature,features/%.feature.java.json,$(FEATURE_FILES))
SPECFLOW_JSON        = $(patsubst features/%.feature,features/%.feature.specflow.json,$(FEATURE_FILES))
FAKE_CUCUMBER_NDJSON = $(patsubst features/%.feature,features/%.feature.ndjson,$(FEATURE_FILES))

SPECFLOW_DIR=src/Cucumber.Pro.SpecFlowPlugin.TestDataGenerator

all: cucumber-rb cucumber-js cucumber-java fake-cucumber

cucumber-rb:   $(CUCUMBER_RB_JSON)
cucumber-js:   $(CUCUMBER_JS_JSON)
cucumber-java: $(CUCUMBER_JAVA_JSON)
specflow:      $(SPECFLOW_JSON)
fake-cucumber: $(FAKE_CUCUMBER_NDJSON)

features/%.feature.rb.json: features/%.feature $(RB_FILES)
	-bundle exec cucumber --retry 2 --format json --out $@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

features/%.feature.js.json: features/%.feature $(JS_FILES)
	-./node_modules/.bin/cucumber-js --format json:$@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

features/%.feature.java.json: features/%.feature $(JAVA_FILES)
	-mvn test -Dcucumber.options="--format json:$@ $<"
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

features/%.feature.specflow.json: features/%.feature $(CS_FILES) $(SPECFLOW_DIR)/nuget.exe
	cd $(SPECFLOW_DIR) && \
	mono nuget.exe restore && \
	msbuild && \
	mono --debug ./bin/Debug/Cucumber.Pro.SpecFlowPlugin.TestDataGenerator.exe

features/%.feature.ndjson: features/%.feature $(JS_FILES)
	./node_modules/.bin/fake-cucumber --format ndjson --require features/step_definitions/stepdefs.fakecucumber.js $< > $@

$(SPECFLOW_DIR)/nuget.exe:
	cd $(SPECFLOW_DIR) && wget https://dist.nuget.org/win-x86-commandline/latest/nuget.exe
	
clean:
	rm -rf $(CUCUMBER_RB_JSON) $(CUCUMBER_JS_JSON) $(CUCUMBER_JAVA_JSON) $(SPECFLOW_JSON) $(SPECFLOW_DIR)/nuget.exe $(FAKE_CUCUMBER_NDJSON)
