include $(dir $(lastword $(MAKEFILE_LIST)))/../default.mk

json/%.json: ../../features/%.feature src/test/java/io/cucumber/jsonschema/Stepdefs.java
	mkdir -p $(@D)
	-mvn test -Dcucumber.options="file:$< --plugin json:$@"
	cat $@ | jq --sort-keys "." > $@.tmp
	mv $@.tmp $@
