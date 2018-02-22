SHELL := /usr/bin/env bash

FEATURE_FILES = $(shell find features -name "*.feature")
RB_FILES = $(shell find features -name "*.rb")
JS_FILES = $(shell find features -name "*.js")
JAVA_FILES = $(shell find src -name "*.java")
SPECFLOW_FILES = $(shell find src -name "*.specflow")

CUCUMBER_RB_JSON   = $(patsubst features/%.feature,features/%.feature.rb.json,$(FEATURE_FILES))
CUCUMBER_JS_JSON   = $(patsubst features/%.feature,features/%.feature.js.json,$(FEATURE_FILES))
CUCUMBER_JAVA_JSON = $(patsubst features/%.feature,features/%.feature.java.json,$(FEATURE_FILES))

all: cucumber-rb cucumber-js cucumber-java specflow

cucumber-rb:   $(CUCUMBER_RB_JSON)
cucumber-js:   $(CUCUMBER_JS_JSON)
cucumber-java: $(CUCUMBER_JAVA_JSON)

features/%.feature.rb.json: features/%.feature $(RB_FILES)
	-bundle exec cucumber --retry 2 --format json --out $@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

features/%.feature.js.json: features/%.feature $(JS_FILES)
	-./node_modules/.bin/cucumberjs --format json:$@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

features/%.feature.java.json: features/%.feature $(JAVA_FILES)
	-mvn test -Dcucumber.options="--format json:$@ $<"
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

specflow: $(SPECFLOW_FILES)
	-cd ./src/Cucumber.Pro.SpecFlowPlugin.TestDataGenerator
	msbuild
	mono --debug ./bin/Debug/Cucumber.Pro.SpecFlowPlugin.TestDataGenerator.exe

clean:
	rm -rf $(CUCUMBER_RB_JSON) $(CUCUMBER_JS_JSON) $(CUCUMBER_JAVA_JSON)
