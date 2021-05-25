#### spotifyTrackIdAppJs = []

	0 Track 00
	1 Track 01
	2 Track 02
	3 Track 03
	
#### spotifyTrackArtistIdAppJs = []

	Following results are two be displayed if queryValue is a Track name, i.e., the user searches artist by track name. 
	
	Only top 2 will be in the 'listen' section:
	0 Track 00 Artist 00
	1 Track 00 Artist 01 (if exists)
	
	Rest all comes under 'Artists' section.
	(Only the required number of artists will be displayed using 'if' statement,
	by conditioning the maximum number of artists using .length method.)
	
	2 Track 00 Artist 02
	3 Track 00 Artist 03
	4 Track 00 Artist 04
	...
	
	
	5 Track 01 Artist 05
	6 Track 01 Artist 06
	...
	
	
	7 Track 02 Artist 07
	8 Track 02 Artist 08
	...
	
	
#### spotifyQueryArtistIdAppJs = []

	Results matching the queryValue:
	(if exists)
	
	0 Artist 00
	1 Artist 01
	2 Artist 02
	3 Artist 03
	
#### spotifyAlbumIdAppJs = []

	'Listen' section includes the 0th album only:
	0 Track 00 Album 00

/*
	The following is included in the 'Albums' section:
	1 Track 01 Album 00 (This won't be shown in the 'Album' section, if it is the same as the one from 'Listen' section.)
*/
Instead of using what's written inside /* */ above, we created a new array, "spotifyAlbumIdUniqueAppJs" which only contains unique values.

	The following are also included in the 'Albums' section. These are queryValue based albums:
	2 Album 00
	3 Album 01
	4 Album 02
	5 Album 03
	
	
	

	

	
	
	
