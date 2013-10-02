NeuroReader2
============

Science Feeds retrieval and filtering


this was an overnight hack. use at your own risk!

I have simply injected my own hacky code into the feedek jQuery plugin.

[1] double-click the html file
[2] start typing comma separated keywords
[3] click retrieve feeds!
---> only retrieves feeds matching the keywords
---> keywords found in the feeds are displayed as colorful tags on the right side of each individual feed

a collection of your favorite keywords can be stored in text files: simply drag and drop these text files onto the drop-area to start the feed retrieval.

I have implemented a boolean search:
place the word "boolean" at the beginning of the keyword list to perform a "keyword1 AND (keyword2, keyword3, ...keywordN)" search.

Similarly you can start an author search by placing the word "authors" at the beginning of your comma separated keywords list: neuroreader will look only for author names in the author-field of the feed.

both BOOLEAN and AUTHOR searches work just once. if you start to start another search after having used either boolean or authors nothing happens. I don't know why... and maybe never I will...

again this was an overnight hack, a proof of concept.

just the desperate cry of a scientist drowning in the scientific-literature...
:)
