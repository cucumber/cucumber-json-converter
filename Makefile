examples := $(dir $(wildcard examples/*/))
cucumber-ruby := $(addsuffix cucumber-ruby.json,$(examples))

all: $(cucumber-ruby)

$(cucumber-ruby):
	cd $(dir $@) && bundle exec cucumber -f json -o cucumber-ruby.json -r ruby

clean:
	rm -rf $(addsuffix *.json,$(examples))
