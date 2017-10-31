SHELL := /usr/bin/env bash
FEATURE_FILES = $(shell find examples/single -name "*.feature")
RB_FILES = $(shell find support -name "*.rb")
JS_FILES = $(shell find support -name "*.js")
JAVA_FILES = $(shell find src -name "*.java")

CUCUMBER_RB_JSON   = $(patsubst examples/single/%.feature,examples/single/%.feature.rb.json,$(FEATURE_FILES))
CUCUMBER_JS_JSON   = $(patsubst examples/single/%.feature,examples/single/%.feature.js.json,$(FEATURE_FILES))
CUCUMBER_JAVA_JSON = $(patsubst examples/single/%.feature,examples/single/%.feature.java.json,$(FEATURE_FILES))

all: cucumber-rb cucumber-js cucumber-java

cucumber-rb:   $(CUCUMBER_RB_JSON)
cucumber-js:   $(CUCUMBER_JS_JSON)
cucumber-java: $(CUCUMBER_JAVA_JSON)

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

clean:
	rm -rf $(CUCUMBER_RB_JSON) $(CUCUMBER_JS_JSON) $(CUCUMBER_JAVA_JSON)
