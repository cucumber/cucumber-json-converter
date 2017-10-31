SHELL := /usr/bin/env bash
SINGLE_FEATURE_FILES = $(shell find examples/single -name "*.feature")
MULTIPLE_FEATURE_DIRECTORIES = $(shell find examples/multiple -maxdepth 1 -mindepth 1 -type d)
RB_FILES = $(shell find support -name "*.rb")
JS_FILES = $(shell find support -name "*.js")
JAVA_FILES = $(shell find src -name "*.java")

CUCUMBER_RB_JSON_SINGLE   = $(patsubst examples/single/%.feature,examples/single/%.feature.rb.json,$(SINGLE_FEATURE_FILES))
CUCUMBER_JS_JSON_SINGLE   = $(patsubst examples/single/%.feature,examples/single/%.feature.js.json,$(SINGLE_FEATURE_FILES))
CUCUMBER_JAVA_JSON_SINGLE = $(patsubst examples/single/%.feature,examples/single/%.feature.java.json,$(SINGLE_FEATURE_FILES))
CUCUMBER_RB_JSON_MULTIPLE = $(patsubst examples/multiple/%,examples/multiple/%.rb.json,$(MULTIPLE_FEATURE_DIRECTORIES))
CUCUMBER_JS_JSON_MULTIPLE = $(patsubst examples/multiple/%,examples/multiple/%.js.json,$(MULTIPLE_FEATURE_DIRECTORIES))
CUCUMBER_JAVA_JSON_MULTIPLE = $(patsubst examples/multiple/%,examples/multiple/%.java.json,$(MULTIPLE_FEATURE_DIRECTORIES))

all: cucumber-rb cucumber-js cucumber-java

cucumber-rb:   $(CUCUMBER_RB_JSON_SINGLE) $(CUCUMBER_RB_JSON_MULTIPLE)
cucumber-js:   $(CUCUMBER_JS_JSON_SINGLE) $(CUCUMBER_JS_JSON_MULTIPLE)
cucumber-java: $(CUCUMBER_JAVA_JSON_SINGLE) $(CUCUMBER_JAVA_JSON_MULTIPLE)

examples/single/%.feature.rb.json: examples/single/%.feature $(RB_FILES)
	-bundle exec cucumber --retry 2 --format json --out $@ --require support/ruby $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

examples/single/%.feature.js.json: examples/single/%.feature $(JS_FILES)
	-./node_modules/.bin/cucumberjs --format json:$@ --require support/js $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

examples/single/%.feature.java.json: examples/single/%.feature $(JAVA_FILES)
	-mvn test -Dcucumber.options="--format json:$@ $<"
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

examples/multiple/%.rb.json: examples/multiple/% $(RB_FILES)
	-bundle exec cucumber --retry 2 --format json --out $@ --require support/ruby $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

examples/multiple/%.js.json: examples/multiple/% $(JS_FILES)
	-./node_modules/.bin/cucumberjs --format json:$@ --require support/js $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

examples/multiple/%.java.json: examples/multiple/% $(JAVA_FILES)
	-mvn test -Dcucumber.options="--format json:$@ $<"
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@

clean:
	rm -rf $(CUCUMBER_RB_JSON_SINGLE) $(CUCUMBER_JS_JSON_SINGLE) $(CUCUMBER_JAVA_JSON_SINGLE) $(CUCUMBER_RB_JSON_MULTIPLE) $(CUCUMBER_JS_JSON_MULTIPLE) $(CUCUMBER_JAVA_JSON_MULTIPLE)
