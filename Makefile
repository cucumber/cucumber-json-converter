SHELL := /usr/bin/env bash
FEATURE_FILES = $(shell find features -name "*.feature")

CUCUMBER_RB_JSON   = $(patsubst features/%.feature,features/%.feature.rb.json,$(FEATURE_FILES))
CUCUMBER_JS_JSON   = $(patsubst features/%.feature,features/%.feature.js.json,$(FEATURE_FILES))
CUCUMBER_JAVA_JSON = $(patsubst features/%.feature,features/%.feature.java.json,$(FEATURE_FILES))

all: cucumber-rb cucumber-js cucumber-java

cucumber-rb:   $(CUCUMBER_RB_JSON)
cucumber-js:   $(CUCUMBER_JS_JSON)
cucumber-java: $(CUCUMBER_JAVA_JSON)

features/%.feature.rb.json: features/%.feature
	-bundle exec cucumber --format json --out $@ --require support/ruby $<

features/%.feature.js.json: features/%.feature
	-./node_modules/.bin/cucumberjs --format json:$@ --require support/js $<

features/%.feature.java.json: features/%.feature
	-mvn test -Dcucumber.options="--format json:$@ $<"

clean:
	rm -rf $(CUCUMBER_RB_JSON) $(CUCUMBER_JS_JSON) $(CUCUMBER_JAVA_JSON)
