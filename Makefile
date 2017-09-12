examples := $(dir $(wildcard examples/*/))
cucumber-ruby := $(addsuffix cucumber-ruby.json,$(examples))
cucumber-js := $(addsuffix cucumber-js.json,$(examples))

all: $(cucumber-ruby) $(cucumber-js)

$(cucumber-ruby):
	cd $(dir $@) && bundle exec cucumber -f json -o cucumber-ruby.json -r support/ruby

$(cucumber-js):
	cd $(dir $@) && ../../node_modules/.bin/cucumberjs -f json:cucumber-js.json -r ../../support/js/env.js

clean:
	rm -rf $(addsuffix *.json,$(examples))
