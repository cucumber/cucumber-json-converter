examples=$(wildcard examples/*)

$(examples)/cucumber-ruby.json:

	cd $(dir $@) && bundle exec cucumber -f json -o cucumber-ruby.json -r ruby

clean:
	rm -rf $(examples)/cucumber-ruby.json
