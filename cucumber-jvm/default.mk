include $(dir $(lastword $(MAKEFILE_LIST)))/../default.mk

Gemfile.lock: Gemfile
	bundle install
	touch $@

json/%.json: ../../features/%.feature stepdefs.rb Gemfile.lock
	mkdir -p $(@D)
	-bundle exec cucumber --require stepdefs.rb --retry 2 --format json --out $@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@
