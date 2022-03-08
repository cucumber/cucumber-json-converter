include $(dir $(lastword $(MAKEFILE_LIST)))/../default.mk

package-lock.json: package.json
	npm install
	touch $@

json/%.json: ../../features/%.feature stepdefs.js package-lock.json
	mkdir -p $(@D)
	-./node_modules/.bin/cucumber-js --require stepdefs.js --format json:$@ $<
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@
