FEATURE_FILES := $(wildcard ../../features/*.feature)
JSON_FILES = $(patsubst ../../features/%.feature,json/%.json,$(FEATURE_FILES))

json-files: $(JSON_FILES)

clean:
	rm -rf json
