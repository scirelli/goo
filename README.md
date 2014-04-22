goo
===

Threw some files together to search developers.google.com pages. 
Pretty crappy, maybe I'll make a real crawler when I get some time.

Run:
npm install

Text urls:
Ran this in a tmp folder to dl all of developers.google
    wget -r https://developers.google.com

Ran this to search for goo.gl urls
    grep -r "[^/]goo\.gl/" . > ../tmp/google.txt

Ran test.js to clean up the file and print the URLs

Images:
Ran something like this to create a list of all images
    find ../../developers.google.com/ -type f -name *.jpg -o -name *.jpeg -o -name *.webp -o -name *.gif -o -name *.png -o -name *.bmp > images.txt
Then ran images.js (requires imagemagick) to look at the meta data

Youtube:
Ran this to grab youtube urls
    grep -roh "www\.youtube\.com/embed/[A-Za-z0-9_\-]*" ./developers.google.com/ > youtube.txt
Then ran youtube.js to look at the anotations on the videos and pull out goo.gl codes

Random links:
randgoo.js just generates random goo.gl/ urls. Nothing high quality about the randomness just what's built into node. Did this just for the hell of it.
