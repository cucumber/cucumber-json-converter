include $(dir $(lastword $(MAKEFILE_LIST)))/../default.mk

Gemfile.lock: Gemfile
	bundle install
	touch $@

json/%.json: ../../features/%.feature stepdefs.rb Gemfile.lock
	mkdir -p $(@D)
	-bundle exec cucumber --require stepdefs.rb --format json --out $@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@
