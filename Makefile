EXAMPLES = $(wildcard examples/*)

ruby: $(EXAMPLES)/cucumber-ruby.json
	cd $(dirname "$@")
	bundle exec cucumber -f json -o cucumber-ruby.json

