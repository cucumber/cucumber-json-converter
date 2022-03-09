MAKEFILES = $(shell find testdata -maxdepth 3 -type f -name Makefile)
SUBDIRS   = $(filter-out ./,$(dir $(MAKEFILES)))

.PHONY: all $(SUBDIRS)
all: $(SUBDIRS)

$(SUBDIRS):
	cd $@ && make
